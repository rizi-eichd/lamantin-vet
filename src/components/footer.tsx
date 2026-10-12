import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "./header";
import { clinic, navigation } from "@/data/contacts";
import { FooterSurface } from "./footer-surface";
import { CookieSettings } from "./cookie-notice";
export function Footer() {
  return (
    <>
      <FooterSurface>
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <p>
                Ветеринарная клиника, ветаптека
                <br />и зоотовары в Первоуральске.
              </p>
            </div>
            <nav aria-label="Навигация в подвале">
              {navigation.slice(1).map(([name, href]) => (
                <Link key={name} href={href}>
                  {name}
                </Link>
              ))}
            </nav>
            <div className="footer-contact">
              <a href={clinic.phoneHref}>{clinic.phone}</a>
              <p>
                {clinic.city}, {clinic.address}
              </p>
              <a href={clinic.maps} target="_blank" rel="noopener noreferrer">
                Мы на Яндекс Картах <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Здоровый питомец</span>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/consent">Обработка персональных данных</Link>
            <CookieSettings />
          </div>
        </div>
      </FooterSurface>
      <div className="mobile-actions">
        <a href={clinic.phoneHref}>
          <Phone size={18} />
          Позвонить
        </a>
        <Link href="/booking">
          Заявка на приём <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
