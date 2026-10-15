import { describe, expect, it, vi } from "vitest";
import { bookingSchema, formatPhone, localToday } from "./booking";
import { handleBooking } from "./booking-handler";

const valid = {
  owner: "Анна",
  phone: "+7 (900) 123-45-67",
  pet: "Барсик",
  species: "cat",
  service: "consultation",
  date: "2099-11-01",
  time: "12:30",
  comment: "",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};
const request = (body: unknown = valid, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
const deps = () => ({
  token: "test-token",
  chatId: "test-chat",
  limit: async () => true,
  send: async () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
});
describe("booking validation", () => {
  it("uses the clinic's Moscow date near midnight", () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date("2026-06-01T20:30:00Z"));
      expect(localToday()).toBe("2026-06-01");
    } finally {
      vi.useRealTimers();
    }
  });
  it("accepts complete booking and normalizes Russian phone", () => {
    expect(bookingSchema.safeParse(valid).success).toBe(true);
    expect(formatPhone("89001234567")).toBe("+7 (900) 123-45-67");
  });
  it.each([
    { phone: "123" },
    { consent: false },
    { date: "2020-01-01" },
    { date: "2099-02-31" },
    { service: "invented" },
    { owner: "" },
    { time: "25:99" },
    { species: "invented" },
  ])("rejects invalid field %o", (field) => {
    expect(bookingSchema.safeParse({ ...valid, ...field }).success).toBe(false);
  });
});
describe("delivery contract", () => {
  it("uses the new clinic phone when delivery is unavailable", async () => {
    const response = await handleBooking(request(), { ...deps(), token: "" });
    expect((await response.json()).message).toContain("+7 (473) 290-46-84");
  });
  it("identifies Zooprofi and Moscow time in administrator notifications", async () => {
    let message = "";
    await handleBooking(request(), {
      ...deps(),
      send: async (_url, init) => {
        message = JSON.parse(String(init.body)).text;
        return new Response('{"ok":true}', { status: 200 });
      },
    });
    expect(message).toContain("Новая заявка — Фаворит");
    expect(message).toContain("(Москва)");
  });
  it("returns unavailable without Telegram", async () => {
    const r = await handleBooking(request(), { ...deps(), token: "" });
    expect(r.status).toBe(503);
    expect((await r.json()).ok).toBe(false);
  });
  it("returns success only after Telegram confirms delivery", async () => {
    const r = await handleBooking(request(), deps());
    expect(r.status).toBe(200);
    expect((await r.json()).ok).toBe(true);
  });
  it("rejects Telegram API failure even with HTTP 200", async () => {
    const r = await handleBooking(request(), {
      ...deps(),
      send: async () => new Response('{"ok":false}', { status: 200 }),
    });
    expect(r.status).toBe(502);
  });
  it("handles network failure", async () => {
    const r = await handleBooking(request(), {
      ...deps(),
      send: async () => {
        throw new Error("timeout");
      },
    });
    expect(r.status).toBe(502);
  });
  it("rejects missing consent before contacting Telegram", async () => {
    const r = await handleBooking(
      request({ ...valid, consent: false }),
      deps(),
    );
    expect(r.status).toBe(400);
  });
  it("rejects honeypot without false success", async () => {
    const r = await handleBooking(
      request({ ...valid, website: "spam" }),
      deps(),
    );
    expect(r.status).toBe(400);
  });
  it("rejects immediate automated submission", async () => {
    const r = await handleBooking(
      request({ ...valid, startedAt: Date.now() }),
      deps(),
    );
    expect(r.status).toBe(400);
  });
  it("limits repeated requests", async () => {
    const r = await handleBooking(request(), {
      ...deps(),
      limit: async () => false,
    });
    expect(r.status).toBe(429);
  });
  it("rejects cross-origin request", async () => {
    const r = await handleBooking(
      request(valid, "https://evil.example"),
      deps(),
    );
    expect(r.status).toBe(403);
  });
  it("accepts configured public origin behind internal HTTP proxy", async () => {
    const r = await handleBooking(request(valid, "https://clinic.example"), {
      ...deps(),
      publicOrigin: "https://clinic.example",
    });
    expect(r.status).toBe(200);
  });
  it("rejects internal or foreign origin when a public origin is configured", async () => {
    const r = await handleBooking(request(), {
      ...deps(),
      publicOrigin: "https://clinic.example",
    });
    expect(r.status).toBe(403);
  });
  it("rejects large request", async () => {
    const r = await handleBooking(
      request({ ...valid, comment: "a".repeat(17000) }),
      deps(),
    );
    expect(r.status).toBe(413);
  });
  it("rejects malformed JSON", async () => {
    const r = await handleBooking(
      new Request("http://localhost:3000/api/booking", {
        method: "POST",
        body: "{",
      }),
      deps(),
    );
    expect(r.status).toBe(400);
  });
});
