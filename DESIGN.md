---
name: Подорожник
description: Лист подорожника — насыщенный зелёный, свежий лаймовый акцент и форма листа в фотографиях и деталях
colors:
  leaf: "#174a31"
  leaf-deep: "#0e3321"
  leaf-vein: "#21603f"
  leaf-line: "#2f6b4a"
  sprout: "#cdec6f"
  sprout-wash: "#e3f2b8"
  sprout-ink: "#2c4417"
  dew: "#f1f5ea"
  paper: "#fbfdf7"
  ink: "#10291b"
  moss: "#4a6352"
  line: "#d3decb"
  on-leaf: "#eaf3e1"
  on-leaf-muted: "#a8c4ad"
typography:
  wordmark:
    fontFamily: "Unbounded, Segoe UI, sans-serif"
    fontSize: "clamp(38px, 6.1vw, 90px)"
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Unbounded, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 64px)"
    fontWeight: "500"
    lineHeight: "1.06"
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Unbounded, Segoe UI, sans-serif"
    fontSize: "clamp(28px, 3.4vw, 48px)"
    fontWeight: "500"
    lineHeight: "1.1"
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Onest, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: "600"
    lineHeight: "1.3"
  body:
    fontFamily: "Onest, Segoe UI, sans-serif"
    fontSize: "17px"
    lineHeight: "1.6"
  small:
    fontFamily: "Onest, Segoe UI, sans-serif"
    fontSize: "14px"
    lineHeight: "1.55"
rounded:
  field: "14px"
  pill: "999px"
  leaf-small: "24px 6px 24px 6px"
  leaf-photo: "clamp(96px, 13vw, 210px) 24px"
  sheet: "28px 120px 28px 28px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(72px, 9vw, 128px)"
  container: "1340px"
components:
  button-primary:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "54px"
  button-sprout:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.leaf-deep}"
    rounded: "{rounded.pill}"
    height: "54px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.leaf}"
    rounded: "{rounded.pill}"
    height: "54px"
  form-sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
---

# Design System: Подорожник

## Overview

**Creative North Star: «Лист подорожника».** Подорожник — первая помощь, которую каждый знает с детства. Сайт построен из этого листа: насыщенная зелень листа как основная поверхность, лаймовый цвет цветоноса как акцент, параллельные дуговые прожилки как единственный орнамент и асимметричная «листовая» форма углов у фотографий и деталей.

Стратегия цвета — Committed: зелёный `leaf` занимает шапку, обложку, блок записи и подвал; `sprout` целиком заливает раздел «Как записаться» и выделяет главное действие на тёмном. Светлые разделы стоят на зеленоватом `dew`, а не на креме.

## Logo

Векторный лист подорожника с тремя прожилками, сходящимися у основания и у кончика, наклонён на 28°. Компонент `LeafMark` в `src/components/brand.tsx`, цвета задаются переменными `--logo-leaf` и `--logo-vein` (на зелёном — лаймовый лист с зелёными прожилками, на светлом — наоборот). Значок вкладки — `src/app/icon.svg`. Словесный знак — «Подорожник», Unbounded 600.

## Colors

- `leaf` / `leaf-deep` — поверхности бренда: шапка, обложка, запись, подвал; `leaf-vein` — прожилки на зелёном; `leaf-line` — разделители на зелёном.
- `sprout` — главное действие на зелёном, заголовки на зелёном, заливка раздела шагов. `sprout-wash` — подложки иконок, кнопок «Заявка» и примечаний; `sprout-ink` — текст на лаймовом.
- `dew` — фон страницы; `paper` — формы, FAQ; `ink` — основной текст; `moss` — пояснения; `line` — разделители.
- Текст на зелёном — `on-leaf`, вторичный — `on-leaf-muted` (оттенок листа, не серый).

## Typography

Unbounded (500/600) — заголовки, словесный знак, номера шагов, крупные телефоны. Onest (400/500/600) — текст, интерфейс, формы. Оба шрифта локальные (`@fontsource`), с кириллицей. Иерархия создаётся весом и масштабом; цифры телефонов и цен — tabular-nums.

## Layout

Контейнер 1340px, поля `gutter`. Разделы чередуют поверхности: зелёная обложка → светлые услуги (две колонки категорий, открытые строки) → лаймовые шаги → цены с липкой подписью → FAQ на `paper` → зелёный блок записи с формой → тёмный подвал с огромным словесным знаком, который подрезан снизу. На ширине ≤900px колонки складываются; на ≤760px появляется нижняя панель «Позвонить / Записаться».

## Shapes

Форма листа: два противоположных угла большие, два маленьких. Фото на обложке и услугах — `leaf-photo`; иконки услуг, переключатели FAQ и примечания — `leaf-small` (при наведении/раскрытии форма «переворачивается»); лист формы — `sheet`. Кнопки, поиск и чипсы — пилюли.

## Components

- **Кнопки:** `btn-primary` (зелёная, на светлом), `btn-sprout` (лаймовая, на зелёном), `btn-green`, `btn-outline`. Высота 54px (малая 44px). Наведение только для точного указателя; нажатие scale 0.97.
- **Строки услуг:** иконка в листовой подложке, название, описание, стрелка; без карточек.
- **Поля:** 52px, заливка `dew`, рамка 1.5px `line`, фокус — рамка `leaf` и лаймовое кольцо 4px. Ошибка — цвет рамки плюс текст.
- **Меню:** полноэкранная зелёная панель (Radix Dialog) с крупными ссылками Unbounded; на ≥1181px заменяется навигацией в шапке.
- **Cookie:** компактная плашка справа внизу.

## Motion

Один авторский момент на обложке: прожилки прорисовываются (stroke-dashoffset, 1.6s), фото раскрывается снизу через clip-path, текст поднимается. Кривая `cubic-bezier(0.23, 1, 0.32, 1)`. Контент виден без JS; `prefers-reduced-motion` отключает анимации.

## Do's and Don'ts

- Do держать адрес, телефон и ссылки только в `src/data/contacts.ts` (сейчас там заглушки).
- Do использовать прожилки только как фон крупных зелёных разделов.
- Don't выдумывать врачей, отзывы, цены и рейтинги — пустые разделы не выводятся.
- Don't добавлять надписи-«кикеры» над заголовками и одинаковые карточки.
- Don't возвращать кремовый фон, каштановый и фото прежней клиники.
