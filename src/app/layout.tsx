import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieNotice } from "@/components/cookie-notice";
import { clinic } from "@/data/contacts";
import "./globals.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";
export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: "Здоровый питомец — ветеринарная клиника в Первоуральске",
    template: "%s | Здоровый питомец",
  },
  description:
    "Ветеринарная клиника, ветаптека и зоотовары в Первоуральске. Береговая, 10А. Узнайте об услугах и оставьте заявку на приём: +7 (900) 200-27-30.",
  robots: {
    index: process.env.SITE_INDEXABLE === "true",
    follow: process.env.SITE_INDEXABLE === "true",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: clinic.name,
    title: "Здоровый питомец — клиника в Первоуральске",
    description: "Ветеринарная помощь в Первоуральске. Береговая, 10А.",
    images: [
      {
        url: "/images/pets.webp",
        width: 960,
        height: 1280,
        alt: "Собака и кошка — фотография из карточки клиники",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <div className="site-frame">
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CookieNotice />
        </div>
      </body>
    </html>
  );
}
