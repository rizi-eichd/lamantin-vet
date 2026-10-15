import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettings } from "@/components/cookie-notice";

export const metadata: Metadata = {
  title: "Использование cookie",
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return (
    <div className="container document-page">
      <div className="page-intro">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span>/</span>
          <span>Cookie</span>
        </nav>
        <h1>Использование cookie</h1>
      </div>
      <article className="legal-content">
        <p>
          Cookie — небольшие данные, которые сайт сохраняет в браузере. На этом
          сайте они нужны для запоминания закрытия уведомления о cookie.
        </p>
        <h2>Что сохраняется</h2>
        <p>
          После нажатия «Понятно» сохраняется cookie{" "}
          <code>fv_cookie_notice</code> со значением <code>v1</code> на 180
          дней. В нём нет имени, телефона, сведений о питомце или содержимого
          заявки. Cookie действует на этом сайте.
        </p>
        <h2>Аналитика и реклама</h2>
        <p>
          Аналитические счётчики и рекламные cookie на сайте не подключены.
          Кнопка «Понятно» закрывает уведомление и не включает отслеживание.
        </p>
        <h2>Как изменить настройки</h2>
        <p>
          Cookie можно удалить или заблокировать в настройках браузера. Если
          удалить этот cookie, уведомление появится при следующем посещении. При
          блокировке cookie сайт продолжит работать, но закрытие уведомления не
          сохранится после перезагрузки страницы.
        </p>
        <p>
          Открыть уведомление снова можно кнопкой «Настройки cookie» в подвале
          сайта.
        </p>
        <CookieSettings />
        <p>
          Данные из формы записи описаны в{" "}
          <Link className="text-link" href="/privacy">
            политике конфиденциальности
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
