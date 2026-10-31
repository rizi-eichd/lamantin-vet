import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "./brand";
import { clinic, navigation } from "@/data/contacts";
import { CookieSettings } from "./cookie-notice";
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <p>
                Ветеринарная клиника в Санкт-Петербурге. Приём по
                предварительной записи.
              </p>
            </div>
            <nav aria-label="Навигация в подвале">
              {navigation.slice(1).map(([name, href]) => (
                <Link key={name} href={href}>
                  {name}
                </Link>
              ))}
              <Link href="/booking">Запись на приём</Link>
            </nav>
            <div className="footer-contact">
              <a href={clinic.phoneHref}>{clinic.phone}</a>
              <p>
                {clinic.city}, {clinic.address}
              </p>
              <p>{clinic.hours}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {clinic.name}
            </span>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/consent">Обработка персональных данных</Link>
            <CookieSettings />
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            {clinic.name}
          </div>
        </div>
      </footer>
      <div className="mobile-actions">
        <a href={clinic.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </a>
        <Link href="/booking">
          Записаться <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
