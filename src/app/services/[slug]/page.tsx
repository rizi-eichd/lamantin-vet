import type { Metadata } from "next";
import Image from "@/components/site-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { activeServices } from "@/data/services";
import { clinic } from "@/data/contacts";
import { animalPhotos, servicePhotos } from "@/data/animal-photos";
import { prices } from "@/data/prices";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/service-icon";
import { sharedOpenGraph } from "@/lib/seo";
export function generateStaticParams() {
  return activeServices.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = activeServices.find((s) => s.slug === slug);
  if (!s) return { title: "Услуга не найдена" };
  return {
    title: `${s.title} в Санкт-Петербурге`,
    description: `${s.short} Клиника «${clinic.name}», ${clinic.city}. Доступность и стоимость уточняйте по телефону.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      ...sharedOpenGraph,
      title: `${s.title} — ${clinic.name}`,
      description: s.short,
      url: `/services/${s.slug}`,
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = activeServices.find((s) => s.slug === slug);
  if (!s) notFound();
  const price = prices.find((p) => p.serviceSlug === slug)?.price;
  const photo = servicePhotos[slug] ?? animalPhotos.consultation;
  const related = activeServices.filter(
    (x) => x.category === s.category && x.slug !== slug,
  );
  return (
    <div className="container">
      <div className="page-intro service-intro">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#services">Услуги</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{s.title}</span>
        </nav>
        <div className="service-intro-split">
          <div>
            <span className="service-badge">
              <ServiceIcon name={s.icon} size={30} />
            </span>
            <h1>{s.title}</h1>
            <p>{s.short}</p>
          </div>
          <div className="service-intro-photo">
            <Image
              src={photo.src}
              alt={photo.alt}
              style={{ objectPosition: photo.position }}
              fill
              priority
              sizes="(max-width:760px) 90vw, 45vw"
            />
          </div>
        </div>
      </div>
      <div className="service-page-grid">
        <article className="service-content">
          <p>{s.description}</p>
          <h2>Что обсудим на приёме</h2>
          <ol>
            {s.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2>Перед визитом</h2>
          <p>{s.preparation}</p>
          <div className="service-disclaimer">
            Информация на странице носит общий характер. Подготовку, доступность
            конкретной процедуры и рекомендации для вашего питомца уточните у
            специалиста.{" "}
            {s.availability === "confirm" &&
              "Наличие этой услуги необходимо подтвердить по телефону."}
          </div>
          {related.length > 0 && (
            <>
              <h2>Ещё в разделе «{s.category}»</h2>
              <div className="related-links">
                {related.map((x) => (
                  <Link href={`/services/${x.slug}`} key={x.slug}>
                    {x.title}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </article>
        <aside className="service-side">
          <h2>Записаться на эту услугу</h2>
          <div className="price-line">
            <span>Стоимость</span>
            <span>
              {price == null
                ? "по телефону"
                : `${price.toLocaleString("ru-RU")} ₽`}
            </span>
          </div>
          <p>
            В форме эта услуга будет выбрана автоматически. Укажите телефон и
            желаемое время приёма.
          </p>
          <Button asChild variant="sprout">
            <Link href={`/booking?service=${s.slug}`}>
              Оставить заявку <ArrowUpRight size={18} />
            </Link>
          </Button>
          <a className="text-link" href={clinic.phoneHref}>
            <Phone size={16} aria-hidden="true" />
            {clinic.phone}
          </a>
        </aside>
      </div>
    </div>
  );
}
