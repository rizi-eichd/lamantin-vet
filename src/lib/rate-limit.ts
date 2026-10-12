import { createHash } from "node:crypto";
const buckets = new Map<string, { count: number; expires: number }>();
export async function rateLimit(request: Request) {
  const key = createHash("sha256")
    .update(
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local",
    )
    .digest("hex");
  const url = process.env.UPSTASH_REDIS_REST_URL,
    token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const r = await fetch(
      `${url}/eval/${encodeURIComponent("local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 600) end; return n")}/1/booking:${key}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      },
    );
    if (!r.ok) throw new Error("Rate limiter unavailable");
    const data = await r.json();
    if (typeof data.result !== "number")
      throw new Error("Invalid limiter response");
    return data.result <= 5;
  }
  const now = Date.now();
  for (const [k, v] of buckets) if (v.expires <= now) buckets.delete(k);
  const old = buckets.get(key);
  if (old) {
    old.count++;
    return old.count <= 5;
  }
  if (buckets.size >= 10000) return false;
  buckets.set(key, { count: 1, expires: now + 600000 });
  return true;
}
