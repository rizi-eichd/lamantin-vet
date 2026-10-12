import { z } from "zod";
import { activeServices } from "../data/services";
import { clinic } from "../data/contacts";
export function localToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: clinic.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8") || digits.startsWith("7"))
    digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return value ? "+7" : "";
  return (
    "+7 (" +
    digits.slice(0, 3) +
    (digits.length >= 3 ? ") " : "") +
    digits.slice(3, 6) +
    (digits.length > 6 ? "-" + digits.slice(6, 8) : "") +
    (digits.length > 8 ? "-" + digits.slice(8, 10) : "")
  );
}
export const bookingSchema = z.object({
  owner: z
    .string()
    .trim()
    .min(2, "Введите имя, минимум 2 символа")
    .max(80, "Не более 80 символов"),
  phone: z
    .string()
    .refine(
      (v) => /^7\d{10}$/.test(v.replace(/\D/g, "")),
      "Введите полный российский номер телефона",
    ),
  pet: z
    .string()
    .trim()
    .min(1, "Введите кличку питомца")
    .max(80, "Не более 80 символов"),
  species: z.enum(["cat", "dog", "other"], { error: "Выберите вид животного" }),
  service: z
    .string()
    .refine((v) => activeServices.some((s) => s.slug === v), "Выберите услугу"),
  date: z
    .string()
    .refine(
      (v) =>
        /^\d{4}-\d{2}-\d{2}$/.test(v) &&
        !Number.isNaN(Date.parse(v)) &&
        new Date(v).toISOString().slice(0, 10) === v &&
        v >= localToday(),
      "Выберите корректную дату, не раньше сегодняшней",
    ),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Укажите желаемое время"),
  comment: z.string().trim().max(1000, "Не более 1000 символов"),
  consent: z
    .boolean()
    .refine(Boolean, "Необходимо согласие на обработку данных"),
  website: z.string().max(0, "Не удалось отправить заявку"),
  startedAt: z.number().finite(),
});
export type Booking = z.infer<typeof bookingSchema>;
