"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { prices } from "@/data/prices";
const categories = ["Все услуги", ...new Set(prices.map((p) => p.category))];
export function PriceList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все услуги");
  const filtered = prices.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase().trim()) &&
      (category === "Все услуги" || p.category === category),
  );
  return (
    <div className="price-panel">
      <div className="price-controls">
        <div className="search">
          <Search size={20} />
          <input
            aria-label="Поиск по услугам"
            placeholder="Найти услугу"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <label className="sr-only" htmlFor="price-category">
          Категория услуг
        </label>
        <select
          id="price-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="price-head">
        <span>Услуга</span>
        <span>Стоимость</span>
        <span />
      </div>
      <div aria-live="polite">
        {filtered.map((p) => (
          <div className="price-row" key={p.serviceSlug}>
            <Link href={`/services/${p.serviceSlug}`}>{p.title}</Link>
            <span>
              {p.price === null
                ? "Уточняйте по телефону"
                : `${p.price.toLocaleString("ru-RU")} ₽`}
            </span>
            <Link
              className="price-book"
              href={`/booking?service=${p.serviceSlug}`}
              aria-label={`Оставить заявку: ${p.title}`}
            >
              Заявка <ArrowUpRight size={17} />
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="empty-search">
            Ничего не найдено. Попробуйте другое название услуги.
          </p>
        )}
      </div>
      <p className="price-note">
        Стоимость и доступность процедуры администратор уточнит перед записью.
      </p>
    </div>
  );
}
