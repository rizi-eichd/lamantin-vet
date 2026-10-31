import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieNotice } from "@/components/cookie-notice";
import { clinic } from "@/data/contacts";
import { sharedOpenGraph } from "@/lib/seo";
import "./globals.css";
import "@fontsource/onest/cyrillic-400.css";
import "@fontsource/onest/cyrillic-500.css";
import "@fontsource/onest/cyrillic-600.css";
import "@fontsource/onest/latin-400.css";
import "@fontsource/onest/latin-500.css";
import "@fontsource/onest/latin-600.css";
import "@fontsource/unbounded/cyrillic-500.css";
import "@fontsource/unbounded/cyrillic-600.css";
import "@fontsource/unbounded/latin-500.css";
import "@fontsource/unbounded/latin-600.css";
export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: "Подорожник — ветеринарная клиника в Санкт-Петербурге",
    template: "%s | Подорожник",
  },
  description:
    `Ветеринарная клиника «Подорожник» в Санкт-Петербурге. Осмотр, прививки, УЗИ, хирургия и уход. Заявка на приём онлайн или по телефону ${clinic.phone}.`,
  robots: {
    index: process.env.SITE_INDEXABLE === "true",
    follow: process.env.SITE_INDEXABLE === "true",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: clinic.name,
    title: "Подорожник — ветеринарная клиника в Санкт-Петербурге",
    description: "Ветеринарная помощь в Санкт-Петербурге: осмотр, прививки, УЗИ, хирургия и уход.",
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
