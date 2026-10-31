import Image from "@/components/site-image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Phone,
  Clock3,
  Quote,
} from "lucide-react";
import { clinic } from "@/data/contacts";
import { animalPhotos } from "@/data/animal-photos";
import { activeServices } from "@/data/services";
import { doctors } from "@/data/team";
import { reviews } from "@/data/reviews";
import { faq } from "@/data/faq";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/service-icon";
import { PriceList } from "@/components/price-list";
import { BookingForm } from "@/components/booking-form";
import { LeafMark } from "@/components/brand";
import styles from "./home.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  {
    title: "Выберите услугу",
    text: "Откройте описание: что входит в приём и что уточнить перед визитом.",
  },
  {
    title: "Уточните стоимость",
    text: "Позвоните администратору, чтобы узнать цену и доступность процедуры.",
  },
  {
    title: "Согласуйте время",
    text: "Укажите желаемые дату и время в заявке. Дождитесь подтверждения клиники.",
  },
  {
    title: "Приезжайте",
    text: `Возьмите ветеринарный паспорт. Адрес: ${clinic.city}, ${clinic.address}.`,
  },
];

const serviceGroups = [...new Set(activeServices.map((s) => s.category))].map(
  (category) => ({
    category,
    services: activeServices.filter((s) => s.category === category),
  }),
);

/** Parallel arcs that meet at both ends, like the veins of a plantain leaf. */
function Veins({ className }: { className: string }) {
  const arcs = [-300, -210, -130, -60, 0, 60, 130, 210, 300];
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {arcs.map((bend, i) => (
        <path
          key={bend}
          d={`M500 1060 C${500 + bend} 760 ${500 + bend} 240 500 -60`}
          style={{ animationDelay: `${120 + Math.abs(i - 4) * 90}ms` }}
        />
      ))}
    </svg>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: clinic.name,
    url: clinic.siteUrl,
    telephone: clinic.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressRegion: clinic.region,
      addressCountry: "RU",
    },
    openingHours: clinic.openingHours,
  };
  const verifiedReviews = reviews.filter((r) => r.verified);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.home}>
        <section className={styles.hero}>
          <Veins className={styles.heroVeins} />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                {clinic.name}
                <span className="sr-only">
                  {" "}
                  — {clinic.descriptor.toLowerCase()} в Санкт-Петербурге
                </span>
              </h1>
              <p className={styles.heroLead}>
                Ветеринарная клиника в Санкт-Петербурге. Осмотр, прививки,
                УЗИ, хирургия и уход — бережно и без лишней спешки.
              </p>
              <div className={styles.heroActions}>
                <Button asChild variant="sprout">
                  <Link href="/booking">
                    Записаться на приём <ArrowUpRight size={20} />
                  </Link>
                </Button>
                <a className={styles.heroPhone} href={clinic.phoneHref}>
                  <Phone size={18} />
                  {clinic.phone}
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <figure className={`${styles.leafFrame} ${styles.heroPhoto}`}>
                <Image
                  src={animalPhotos.hero.src}
                  alt={animalPhotos.hero.alt}
                  style={{ objectPosition: "74% 42%" }}
                  fill
                  priority
                  sizes="(max-width:760px) 92vw, 46vw"
                />
              </figure>
              <figure className={`${styles.leafFrame} ${styles.heroPhotoSmall}`}>
                <Image
                  src={animalPhotos.resting.src}
                  alt={animalPhotos.resting.alt}
                  style={{ objectPosition: animalPhotos.resting.position }}
                  fill
                  sizes="(max-width:760px) 40vw, 16vw"
                />
              </figure>
              <span className={styles.heroSeal} aria-hidden="true">
                <LeafMark size={44} />
              </span>
            </div>
            <dl className={styles.heroFacts}>
                <div>
                  <dt>
                    <Clock3 size={16} aria-hidden="true" />
                    Часы работы
                  </dt>
                  <dd>{clinic.hoursShort}</dd>
                </div>
                <div>
                  <dt>
                    <MapPin size={16} aria-hidden="true" />
                    Адрес
                  </dt>
                  <dd>
                    {clinic.city}, {clinic.shortAddress}
                  </dd>
                </div>
              </dl>
          </div>
        </section>

        <section id="services" className={styles.services}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2>Чем поможем питомцу</h2>
              <p>
                Откройте услугу, чтобы узнать порядок приёма и подготовку.
                Стоимость и доступность уточните по телефону.
              </p>
            </div>
            <div className={styles.serviceGrid}>
              {serviceGroups.map((group) => (
                <div className={styles.serviceGroup} key={group.category}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className={styles.serviceRow}
                        >
                          <span className={styles.serviceIcon}>
                            <ServiceIcon name={s.icon} size={22} />
                          </span>
                          <span className={styles.serviceText}>
                            <strong>{s.title}</strong>
                            <span>{s.short}</span>
                          </span>
                          <ArrowUpRight
                            className={styles.serviceArrow}
                            size={20}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="visit" className={styles.visit}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2>Как записаться</h2>
              <p>
                Заявка на сайте — это запрос. Время приёма подтверждает
                администратор клиники.
              </p>
            </div>
            <ol className={styles.steps}>
              {steps.map((step, i) => (
                <li key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <div className={styles.visitActions}>
              <Button asChild>
                <Link href="/booking">
                  Оставить заявку <ArrowUpRight size={20} />
                </Link>
              </Button>
              <a className="text-link" href={clinic.phoneHref}>
                или позвоните: {clinic.phone}
              </a>
            </div>
          </div>
        </section>

        <section id="prices" className={styles.prices}>
          <div className={`container ${styles.pricesGrid}`}>
            <div className={styles.pricesIntro}>
              <h2>Услуги и стоимость</h2>
              <p>
                Цены на сайте пока не опубликованы. Позвоните — администратор
                назовёт стоимость выбранной услуги.
              </p>
              <a className="text-link" href={clinic.phoneHref}>
                <Phone size={17} />
                {clinic.phone}
              </a>
            </div>
            <PriceList />
          </div>
        </section>

        {(doctors.length > 0 || verifiedReviews.length > 0) && (
          <section id="team" className={styles.trust}>
            <div className="container">
              {doctors.length > 0 && (
                <>
                  <div className={styles.sectionHead}>
                    <h2>Врачи клиники</h2>
                  </div>
                  <div className="team-grid">
                    {doctors.map((d) => (
                      <article className="doctor-card" key={d.id}>
                        <Image
                          src={d.image}
                          alt={d.name}
                          width={480}
                          height={480}
                        />
                        <h3>{d.name}</h3>
                        <span>{d.specialty}</span>
                        <p>{d.bio}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
              {verifiedReviews.length > 0 && (
                <div id="reviews" className="reviews-grid">
                  {verifiedReviews.map((r) => (
                    <article className="review-card" key={r.id}>
                      <Quote aria-hidden="true" />
                      <p>{r.text}</p>
                      <strong>{r.author}</strong>
                      <small>{r.date}</small>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section id="faq" className={styles.faq}>
          <div className={`container ${styles.faqGrid}`}>
            <div className={styles.faqIntro}>
              <h2>Вопросы перед приёмом</h2>
              <p>
                Не нашли ответ? Позвоните, чтобы уточнить услугу или время
                приёма.
              </p>
              <a className="text-link" href={clinic.phoneHref}>
                {clinic.phone} <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="faq-list">
              {faq.map((f) => (
                <details key={f.question}>
                  <summary>
                    {f.question}
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className={styles.contact}>
          <Veins className={styles.contactVeins} />
          <div className={`container ${styles.contactGrid}`} id="request">
            <div className={styles.contactIntro}>
              <h2>Запишитесь на приём</h2>
              <p>
                Выберите услугу, укажите телефон и желаемое время. Администратор
                перезвонит и подтвердит запись.
              </p>
              <ul className={styles.contactList}>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>
                    <small>Адрес</small>
                    {clinic.city}, {clinic.address}
                  </span>
                </li>
                <li>
                  <Phone aria-hidden="true" />
                  <span>
                    <small>Телефон</small>
                    <a href={clinic.phoneHref}>{clinic.phone}</a>
                  </span>
                </li>
                <li>
                  <Clock3 aria-hidden="true" />
                  <span>
                    <small>Часы работы</small>
                    {clinic.hours}
                  </span>
                </li>
              </ul>
              <a
                className={styles.routeLink}
                href={clinic.route}
                target="_blank"
                rel="noopener noreferrer"
              >
                Построить маршрут <ArrowRight size={18} />
              </a>
            </div>
            <div className={styles.formSheet}>
              <BookingForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
