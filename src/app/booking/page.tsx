import Image from "@/components/site-image";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone } from "lucide-react";
import { BookingQueryForm } from "@/components/booking-query-form";
import { clinic } from "@/data/contacts";
export const metadata: Metadata = {
  title: "Заявка на приём",
  description:
    "Оставьте заявку в клинику Здоровый питомец в Первоуральске. Администратор подтвердит услугу, дату и время.",
  alternates: { canonical: "/booking" },
};
export default function BookingPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span>/</span>
          <span>Запись на приём</span>
        </nav>
        <h1>Заявка на приём</h1>
        <span className="section-context">ФОРМА ЗАЯВКИ</span>
        <p>
          Выберите услугу, укажите телефон и желаемое время. После получения
          заявки администратор свяжется с вами для подтверждения записи.
        </p>
      </div>
      <div className="booking-page-grid">
        <aside className="booking-aside">
          <h3>3 шага до подтверждения записи</h3>
          <ul>
            <li>
              <Check size={17} />
              Вы заполняете заявку
            </li>
            <li>
              <Check size={17} />
              Администратор уточняет детали
            </li>
            <li>
              <Check size={17} />
              Вы согласуете время приёма
            </li>
          </ul>
          <p>
            Выбранное время не считается забронированным до подтверждения
            клиникой.
          </p>
          <p>
            Нужна срочная помощь или удобнее поговорить? Позвоните и уточните
            возможность приёма.
          </p>
          <a className="text-link" href={clinic.phoneHref}>
            <Phone size={17} />
            {clinic.phone}
          </a>
          <div className="booking-aside-photo">
            <Image
              src="/images/pets.webp"
              alt="Собака и кошка рядом — фото из карточки Здорового питомца"
              fill
              sizes="(max-width:760px) 90vw, 35vw"
            />
          </div>
        </aside>
        <Suspense fallback={<p role="status">Загрузка формы…</p>}>
          <BookingQueryForm />
        </Suspense>
      </div>
    </div>
  );
}
