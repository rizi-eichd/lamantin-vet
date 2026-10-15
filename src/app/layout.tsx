import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieNotice } from "@/components/cookie-notice";
import { clinic } from "@/data/contacts";
import { sharedOpenGraph } from "@/lib/seo";
import "./globals.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/500.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: "Фаворит — ветеринарная клиника в Воронеже",
    template: "%s | Фаворит",
  },
  description:
    "Ветеринарная клиника в Воронеже. 45 Стрелковой Дивизии, 48. Узнайте об услугах и оставьте заявку на приём: +7 (473) 290-46-84.",
  robots: {
    index: process.env.SITE_INDEXABLE === "true",
    follow: process.env.SITE_INDEXABLE === "true",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: clinic.name,
    title: "Фаворит — клиника в Воронеже",
    description: "Ветеринарная помощь в Воронеже. 45 Стрелковой Дивизии, 48.",
    images: sharedOpenGraph.images,
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
