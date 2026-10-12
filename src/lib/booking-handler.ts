import { bookingSchema } from "./booking";
import { activeServices } from "../data/services";
import { clinic } from "../data/contacts";
type Dependencies = {
  token?: string;
  chatId?: string;
  publicOrigin?: string;
  developmentOrigins?: string[];
  limit: () => Promise<boolean>;
  send: (url: string, init: RequestInit) => Promise<Response>;
};
const fail = (status: number, message: string) =>
  Response.json(
    { ok: false, message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function handleBooking(request: Request, deps: Dependencies) {
  const origin = request.headers.get("origin");
  const trustedOrigin = new URL(deps.publicOrigin || request.url).origin;
  if (
    origin &&
    origin !== trustedOrigin &&
    !deps.developmentOrigins?.includes(origin)
  )
    return fail(403, "Запрос с другого сайта отклонён.");
  try {
    if (!(await deps.limit()))
      return fail(429, "Слишком много заявок. Попробуйте позже или позвоните.");
  } catch {
    return fail(503, "Сервис записи временно недоступен. Позвоните в клинику.");
  }
  if (Number(request.headers.get("content-length")) > 16000)
    return fail(413, "Слишком большой запрос.");
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400, "Пустая заявка.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      size += next.value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return fail(413, "Слишком большой запрос.");
      }
      chunks.push(next.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    raw = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return fail(400, "Не удалось прочитать заявку.");
  }
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success)
    return fail(400, "Проверьте поля заявки и согласие на обработку данных.");
  const b = parsed.data;
  if (Date.now() - b.startedAt < 2000 || b.startedAt > Date.now())
    return fail(400, "Пожалуйста, заполните форму и попробуйте снова.");
  if (!deps.token || !deps.chatId)
    return fail(
      503,
      `Онлайн-запись пока не подключена. Позвоните: ${clinic.phone}.`,
    );
  const species = { cat: "Кошка", dog: "Собака", other: "Другое животное" };
  const text = [
    `Новая заявка — ${clinic.name}`,
    "Требуется подтверждение администратора",
    `Владелец: ${b.owner}`,
    `Телефон: ${b.phone}`,
    `Питомец: ${b.pet} (${species[b.species]})`,
    `Услуга: ${activeServices.find((s) => s.slug === b.service)?.title}`,
    `Желаемое время: ${b.date} ${b.time} (Москва)`,
    `Комментарий: ${b.comment || "—"}`,
    "Согласие на обработку данных получено. Версия согласия: 2026-10-11",
  ].join("\n");
  try {
    const response = await deps.send(
      `https://api.telegram.org/bot${deps.token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: deps.chatId, text }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const result = await response.json();
    if (!response.ok || result.ok !== true)
      return fail(
        502,
        "Заявка не доставлена. Позвоните в клинику или попробуйте позже.",
      );
    return Response.json(
      {
        ok: true,
        message:
          "Заявка отправлена. Администратор свяжется с вами для подтверждения времени.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return fail(
      502,
      `Не удалось доставить заявку. Позвоните: ${clinic.phone}.`,
    );
  }
}
