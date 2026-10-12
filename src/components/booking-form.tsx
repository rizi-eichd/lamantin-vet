"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CircleCheck, LoaderCircle, Phone } from "lucide-react";
import {
  bookingSchema,
  formatPhone,
  localToday,
  type Booking,
} from "@/lib/booking";
import { activeServices } from "@/data/services";
import { clinic } from "@/data/contacts";
import { Button } from "./ui/button";
export function BookingForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const startedAt = useRef(0);
  const [notice, setNotice] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      owner: "",
      phone: "",
      pet: "",
      species: "cat",
      service: initialService,
      date: "",
      time: "",
      comment: "",
      consent: false,
      website: "",
      startedAt: 0,
    },
  });
  const start = () => {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      setValue("startedAt", startedAt.current);
    }
  };
  const onSubmit = async (data: Booking) => {
    setNotice(null);
    if (process.env.NEXT_PUBLIC_STATIC_HOSTING === "true") {
      setNotice({
        ok: false,
        message: `Онлайн-запись пока не подключена. Позвоните: ${clinic.phone}.`,
      });
      return;
    }
    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      const result = await r.json();
      setNotice({
        ok: r.ok && result.ok === true,
        message: result.message || "Заявка не доставлена. Позвоните в клинику.",
      });
    } catch {
      setNotice({
        ok: false,
        message:
          "Не удалось отправить заявку. Проверьте соединение или позвоните в клинику.",
      });
    }
  };
  const error = (name: keyof Booking) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]?.message}
      </span>
    ) : null;
  const field = (name: keyof Booking) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  if (notice?.ok)
    return (
      <div className="booking-success" role="status">
        <CircleCheck size={50} />
        <h2>Заявка отправлена</h2>
        <p>{notice.message}</p>
        <p>
          Выбранное время пока не подтверждено. Дождитесь звонка администратора.
        </p>
        <Button
          onClick={() => {
            setNotice(null);
            startedAt.current = 0;
          }}
        >
          Оставить ещё одну заявку
        </Button>
      </div>
    );
  return (
    <form
      className="booking-form"
      onFocus={start}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form-grid">
        <label>
          Ваше имя *
          <input
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            {...register("owner")}
            {...field("owner")}
          />
          {error("owner")}
        </label>
        <label>
          Телефон *
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            {...register("phone", {
              onChange: (e) => setValue("phone", formatPhone(e.target.value)),
            })}
            {...field("phone")}
          />
          {error("phone")}
        </label>
        <label>
          Кличка питомца *
          <input
            placeholder="Кличка животного"
            {...register("pet")}
            {...field("pet")}
          />
          {error("pet")}
        </label>
        <label>
          Вид животного *
          <select {...register("species")} {...field("species")}>
            <option value="cat">Кошка</option>
            <option value="dog">Собака</option>
            <option value="other">Другое животное</option>
          </select>
          {error("species")}
        </label>
        <label className="span-2">
          Услуга *
          <select {...register("service")} {...field("service")}>
            <option value="">Выберите услугу</option>
            {activeServices.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {error("service")}
        </label>
        <label>
          Желаемая дата *
          <input
            type="date"
            min={localToday()}
            {...register("date")}
            {...field("date")}
          />
          {error("date")}
        </label>
        <label>
          Желаемое время *
          <input type="time" {...register("time")} {...field("time")} />
          {error("time")}
        </label>
        <label className="span-2">
          Комментарий
          <textarea
            rows={3}
            maxLength={1000}
            placeholder="Причина обращения, симптомы или вопрос врачу"
            {...register("comment")}
            {...field("comment")}
          />
          {error("comment")}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Ваш сайт
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <input
        type="hidden"
        {...register("startedAt", { valueAsNumber: true })}
      />
      <p className="form-caption">
        Указанные дата и время не бронируются автоматически. Дождитесь
        подтверждения администратора.
      </p>
      <label className="consent-check">
        <input type="checkbox" {...register("consent")} {...field("consent")} />
        <span>
          Соглашаюсь на{" "}
          <Link href="/consent" target="_blank">
            обработку персональных данных
          </Link>{" "}
          и ознакомлен(а) с{" "}
          <Link href="/privacy" target="_blank">
            политикой конфиденциальности
          </Link>
          .
        </span>
      </label>
      {error("consent")}
      {notice && (
        <div className="form-notice error" role="alert">
          {notice.message}
          <a href={clinic.phoneHref}>
            <Phone size={16} />
            Позвонить в клинику
          </a>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? (
          <>
            <LoaderCircle className="spinner" size={19} />
            Отправляем заявку…
          </>
        ) : (
          <>
            Отправить заявку <ArrowUpRight size={20} />
          </>
        )}
      </Button>
      <p className="form-caption">
        Для срочной помощи позвоните:{" "}
        <a href={clinic.phoneHref}>{clinic.phone}</a>
      </p>
    </form>
  );
}
