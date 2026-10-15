import Image from "@/components/site-image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  PawPrint,
  Heart,
  MapPin,
  Phone,
  Clock3,
  Check,
  MessageCircle,
  Leaf,
  ShoppingBag,
  UserRound,
  Quote,
} from "lucide-react";
import { clinic } from "@/data/contacts";
import { animalPhotos } from "@/data/animal-photos";
import { activeServices } from "@/data/services";
import { doctors } from "@/data/team";
import { reviews } from "@/data/reviews";
import { faq } from "@/data/faq";
import { Button } from "@/components/ui/button";
import { HomeMotion, HomeReveal as Reveal } from "@/components/home-motion";
import styles from "./home.module.css";
import { ServiceIcon } from "@/components/service-icon";
import { PriceList } from "@/components/price-list";
import { BookingForm } from "@/components/booking-form";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };

const benefits = [
  {
    icon: Heart,
    title: "Выберите услугу",
    text: "Откройте описание: что входит в приём и что уточнить перед визитом.",
  },
  {
    icon: Leaf,
    title: "Уточните стоимость",
    text: "Позвоните администратору, чтобы узнать цену и доступность процедуры.",
  },
  {
    icon: MessageCircle,
    title: "Согласуйте время",
    text: "Укажите желаемые дату и время в заявке. Дождитесь подтверждения клиники.",
  },
  {
    icon: ShoppingBag,
    title: "Найдите вход",
    text: "Посмотрите фото входа и постройте маршрут до ул. 45 Стрелковой Дивизии, 48.",
  },
];
const serviceGroups = [...new Set(activeServices.map((s) => s.category))].map(
  (category) => ({
    category,
    services: activeServices.filter((s) => s.category === category),
  }),
);

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
    hasMap: clinic.maps,
    openingHours: clinic.openingHours,
    image: `${clinic.siteUrl}/images/favorit-entrance.webp`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeMotion className={styles.home}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.coverHeading}>
              <h1 className={styles.heroTitle}>
                <span>{clinic.name}</span>
              </h1>
              <p className={styles.coverPurpose}>
                <span>Ветеринарная клиника</span> <span>в Воронеже</span>
              </p>
            </div>
            <div className={styles.heroStage}>
              <figure className={styles.heroPhoto}>
                <Image
                  src={animalPhotos.hero.src}
                  alt={animalPhotos.hero.alt}
                  style={{ objectPosition: animalPhotos.hero.position }}
                  fill
                  priority
                  sizes="(max-width:760px) 100vw, 90vw"
                />
                <figcaption>
                  Фото: {animalPhotos.hero.author} / Pexels
                </figcaption>
              </figure>
            </div>
            <div className={styles.heroText}>
              <p>
                Оставьте заявку на осмотр, вакцинацию или диагностику. Клиника
                находится в Воронеже, на ул. 45 Стрелковой Дивизии, 48, на первом этаже.
              </p>
              <div className={styles.heroActions}>
                <Button asChild>
                  <Link href="/booking">
                    Оставить заявку <ArrowUpRight size={20} />
                  </Link>
                </Button>
                <a className={styles.heroServiceLink} href="#services">
                  Выбрать услугу <ArrowRight size={18} />
                </a>
              </div>
              <p className={styles.confirmation}>
                После отправки заявки <br />
                <strong>администратор согласует время приёма.</strong>
              </p>
            </div>
            <div className={styles.heroFoot}>
              <a href="#contacts">
                <MapPin size={17} />
                <span>
                  Клиника <strong>45 Стрелковой Дивизии, 48</strong>
                </span>
              </a>
              <a
                href={animalPhotos.hero.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Автор фотографии · Pexels <ArrowUpRight size={14} />
              </a>
              <span>ВЕТЕРИНАРНАЯ КЛИНИКА В ВОРОНЕЖЕ</span>
            </div>
          </div>
        </section>
        <div className="care-strip">
          <div className="container">
            <span>
              <StethoscopeMark />
              Ветеринарная помощь
            </span>
            <i />
            <span>
              <ShoppingBag size={20} />
              Запись на приём
            </span>
            <i />
            <span>
              <MapPin size={20} />
              45 Стрелковой Дивизии, 48
            </span>
            <i />
            <a href={clinic.phoneHref}>
              <Phone size={20} />
              {clinic.phone}
            </a>
          </div>
        </div>
        <section id="services" className={styles.servicesSection}>
          <Reveal className="container">
            <div className="section-heading">
              <div>
                <h2>
                  Выберите услугу
                  <br />
                  для вашего питомца
                </h2>
                <span className="section-context">
                  ПРИЁМ, ДИАГНОСТИКА И ПРОФИЛАКТИКА
                </span>
              </div>
              <p>
                Откройте описание услуги, чтобы узнать порядок приёма и
                подготовку. Стоимость и доступность уточните по телефону.
              </p>
            </div>
            <div className={styles.serviceCatalogue}>
              {serviceGroups.map((group, groupIndex) => (
                <details
                  className={styles.serviceGroup}
                  key={group.category}
                  name="service-categories"
                  open={groupIndex === 0}
                >
                  <summary>
                    <h3>{group.category}</h3>
                    <ChevronDown size={26} aria-hidden="true" />
                  </summary>
                  <div className={styles.serviceEntries}>
                    {group.services.map((s) => (
                      <Link
                        href={`/services/${s.slug}`}
                        key={s.slug}
                        className={styles.serviceEntry}
                      >
                        <ServiceIcon name={s.icon} size={23} />
                        <div>
                          <h3>{s.title}</h3>
                          <p>{s.short}</p>
                          <span>Подробнее об услуге</span>
                        </div>
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
        <section id="about" className={styles.aboutSpread}>
          <div className="container">
            <div className={styles.aboutHeading}>
              <h2>
                Ветеринарная клиника
                <br />
                на улице 45 Стрелковой Дивизии, 48
              </h2>
              <span className="section-context">О КЛИНИКЕ</span>
            </div>
            <div className={styles.clinicPhotos}>
              <figure>
                <Image
                  src="/images/favorit-entrance.webp"
                  alt="Вход в ветеринарную клинику Фаворит на улице 45 Стрелковой Дивизии, 48"
                  fill
                  sizes="(max-width:760px) 90vw, 65vw"
                />
                <figcaption>
                  Вход в клинику <strong>45 Стрелковой Дивизии, 48</strong>
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/images/favorit-cat.webp"
                  alt="Кошка — фотография из карточки клиники Фаворит в 2ГИС"
                  fill
                  sizes="(max-width:760px) 90vw, 30vw"
                />
              </figure>
            </div>
            <div className={styles.aboutDetails}>
              <div>
                <p>
                  В клинике «Фаворит» можно записаться на ветеринарный приём.
                  Клиника находится в Воронеже, на ул. 45 Стрелковой Дивизии, 48,
                  на первом этаже.
                </p>
                <p>
                  Расписание работы указано в контактах. Перед поездкой уточните
                  возможность приёма. В контактах есть телефон, фото входа и
                  ссылка на маршрут.
                </p>
              </div>
              <div>
                <ul className="check-list">
                  <li>
                    <Check size={18} />
                    Ветеринарная клиника
                  </li>
                  <li>
                    <Check size={18} />
                    УЗИ животных
                  </li>
                  <li>
                    <Check size={18} />
                    Запись по телефону
                  </li>
                </ul>
                <Button asChild variant="outline">
                  <a href="#contacts">
                    Перейти к контактам <ArrowUpRight size={18} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.visitSection}>
          <div className="container">
            <Reveal>
              <div className="section-heading">
                <div>
                  <h2>
                    От выбора услуги
                    <br />
                    до визита в клинику
                  </h2>
                  <span className="section-context">
                    КАК СПЛАНИРОВАТЬ ВИЗИТ
                  </span>
                </div>
              </div>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <Reveal key={b.title} index={i} className={styles.visitStep}>
                    <span className={styles.visitNumber} aria-hidden="true">
                      0{i + 1}
                    </span>

                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <div className={`container ${styles.trustLayout}`}>
          <section id="team" className="section team-section">
            <div className="container">
              <Reveal>
                <div className="section-heading">
                  <div>
                    <h2>Врачи клиники</h2>
                    <span className="section-context">СПЕЦИАЛИСТЫ</span>
                  </div>
                  <p>Уточните у администратора, кто ведёт нужный вам приём.</p>
                </div>
                {doctors.length ? (
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
                        <Button asChild>
                          <Link href="/booking">Записаться</Link>
                        </Button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="team-placeholder">
                    <span className="team-icon">
                      <UserRound size={36} strokeWidth={1.4} />
                    </span>
                    <div>
                      <h3>Уточните специалиста по телефону</h3>
                      <p>
                        Имена и расписание врачей пока не опубликованы.
                        Позвоните администратору, чтобы выбрать специалиста и
                        время.
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <a href={clinic.phoneHref}>
                        Уточнить по телефону <Phone size={17} />
                      </a>
                    </Button>
                  </div>
                )}
              </Reveal>
            </div>
          </section>
          <section id="reviews" className="section container">
            <Reveal>
              <div className="section-heading">
                <div>
                  <h2>Отзывы посетителей</h2>
                  <span className="section-context">2ГИС</span>
                </div>
                <Button asChild variant="outline">
                  <a
                    href={clinic.reviews}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Отзывы в 2ГИС <ArrowUpRight size={18} />
                  </a>
                </Button>
              </div>
              {reviews.filter((r) => r.verified).length ? (
                <div className="reviews-grid">
                  {reviews
                    .filter((r) => r.verified)
                    .map((r) => (
                      <article className="review-card" key={r.id}>
                        <Quote />
                        <p>{r.text}</p>
                        <strong>{r.author}</strong>
                        <small>{r.date}</small>
                        <a
                          href={r.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Источник отзыва
                        </a>
                      </article>
                    ))}
                </div>
              ) : (
                <div className="review-invitation">
                  <Quote size={44} strokeWidth={1.2} />
                  <div>
                    <h3>Откройте отзывы в карточке клиники</h3>
                    <p>
                      Ссылка ведёт в 2ГИС. Там можно прочитать отзывы
                      владельцев питомцев и посмотреть их оценки.
                    </p>
                  </div>
                  <span className="review-brand">
                    2<span>ГИС</span>
                    <ArrowUpRight size={24} />
                  </span>
                </div>
              )}
            </Reveal>
          </section>
        </div>
        <section id="prices" className={styles.pricesSection}>
          <Reveal className="container">
            <div className="section-heading">
              <div>
                <h2>Услуги и стоимость</h2>
                <span className="section-context">СТОИМОСТЬ ПРИЁМА</span>
              </div>
              <p>
                Позвоните, чтобы узнать цену выбранной услуги. Суммы на сайте
                пока не опубликованы.
              </p>
            </div>
            <PriceList />
          </Reveal>
        </section>
        <section className={`appointment-banner ${styles.appointmentPoster}`}>
          <div className="container">
            <div>
              <h2>Выберите услугу и время</h2>
              <span className="section-context">ЗАЯВКА НА ПРИЁМ</span>
              <p>
                Форма отправляет заявку администратору. Время приёма нужно
                согласовать с клиникой.
              </p>
              <Button asChild>
                <Link href="/booking">
                  Оставить заявку <ArrowUpRight size={20} />
                </Link>
              </Button>
            </div>
            <div className="banner-paw" aria-hidden="true">
              <PawPrint size={170} strokeWidth={1} />
            </div>
          </div>
        </section>
        <section className="faq-section section">
          <div className="container faq-grid">
            <div>
              <h2>
                Вопросы
                <br />
                перед приёмом
              </h2>
              <span className="section-context">ЗАПИСЬ И ПОДГОТОВКА</span>
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
                    <span className="faq-plus">+</span>
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contacts" className="section container">
          <div className="section-heading">
            <div>
              <h2>
                Как добраться
                <br />
                до клиники
              </h2>
              <span className="section-context">АДРЕС И ЧАСЫ РАБОТЫ</span>
            </div>
            <p>
              Воронеж, ул. 45 Стрелковой Дивизии, 48, 1-й этаж.
              <br />
              Перед поездкой уточните расписание и согласуйте приём.
            </p>
          </div>
          <div className={styles.contactSpread}>
            <div className="contact-photo">
              <Image
                src="/images/favorit-entrance.webp"
                alt="Фотография входа — 45 Стрелковой Дивизии, 48"
                fill
                sizes="(max-width:760px) 95vw, 55vw"
              />
              <span>
                <MapPin size={18} />
                Так выглядит вход в клинику
              </span>
            </div>
            <div className="contact-info">
              <div>
                <MapPin />
                <span>
                  Наш адрес
                  <strong>
                    {clinic.city}, {clinic.address}, {clinic.floor}
                  </strong>
                </span>
              </div>
              <div>
                <Phone />
                <span>
                  Звоните нам<a href={clinic.phoneHref}>{clinic.phone}</a>
                </span>
              </div>
              <div>
                <Clock3 />
                <span>
                  Часы работы
                  <strong>
                    {clinic.hours || "Уточните по телефону перед визитом"}
                  </strong>
                </span>
              </div>
              <Button asChild variant="secondary">
                <a
                  href={clinic.route}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Построить маршрут <ArrowUpRight size={18} />
                </a>
              </Button>
              <a
                className="text-link"
                href={clinic.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть 2ГИС <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className={styles.bookingDesk} id="request">
          <div className="contact-form-grid container">
            <div>
              <h2>
                Укажите услугу
                <br />и время приёма
              </h2>
              <span className="section-context">ЗАЯВКА НА ПРИЁМ</span>
              <p>
                Выберите услугу, укажите телефон и желаемое время. После
                получения заявки администратор свяжется с вами для подтверждения
                записи.
              </p>
              <span className="contact-form-paw">
                <PawPrint size={100} strokeWidth={1} />
              </span>
            </div>
            <div className={styles.formSheet}>
              <BookingForm />
            </div>
          </div>
        </section>
      </HomeMotion>
    </>
  );
}
function StethoscopeMark() {
  return <ServiceIcon name="Stethoscope" size={20} />;
}
