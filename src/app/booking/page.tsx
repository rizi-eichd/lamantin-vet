import Image from "@/components/site-image";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BookingQueryForm } from "@/components/booking-query-form";
import { clinic } from "@/data/contacts";
import { animalPhotos } from "@/data/animal-photos";
export const metadata: Metadata = {
  title: "Заявка на приём",
  description:
    "Оставьте заявку в ветеринарную клинику «Подорожник» в Санкт-Петербурге. Администратор подтвердит услугу, дату и время.",
  alternates: { canonical: "/booking" },
};
export default function BookingPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Запись на приём</span>
        </nav>
        <h1>Заявка на приём</h1>
        <p>
          Выберите услугу, укажите телефон и желаемое время. После получения
          заявки администратор свяжется с вами для подтверждения записи.
        </p>
      </div>
      <div className="booking-page-grid">
        <aside className="booking-aside">
          <h2>Как подтверждается запись</h2>
          <ol>
            <li>Вы заполняете заявку</li>
            <li>Администратор уточняет детали</li>
            <li>Вы согласуете время приёма</li>
          </ol>
          <p>
            Выбранное время не считается забронированным до подтверждения
            клиникой. Нужна срочная помощь? Позвоните.
          </p>
          <a className="text-link" href={clinic.phoneHref}>
            <Phone size={17} aria-hidden="true" />
            {clinic.phone}
          </a>
          <div className="booking-aside-photo">
            <Image
              src={animalPhotos.booking.src}
              alt={animalPhotos.booking.alt}
              style={{ objectPosition: animalPhotos.booking.position }}
              fill
              sizes="(max-width:960px) 1px, 360px"
            />
          </div>
        </aside>
        <div className="booking-sheet">
          <Suspense fallback={<p role="status">Загрузка формы…</p>}>
            <BookingQueryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
