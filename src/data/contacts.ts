// Brand and contact details. Address, phone and links below are
// placeholders: replace them with the clinic's real data before launch.
export const clinic = {
  name: "Подорожник",
  descriptor: "Ветеринарная клиника",
  city: "Санкт-Петербург",
  region: "Санкт-Петербург",
  address: "ул. Примерная, 1",
  shortAddress: "ул. Примерная, 1",
  floor: "",
  phone: "+7 (812) 000-00-00",
  phoneHref: "tel:+78120000000",
  maps: "https://2gis.ru/spb",
  route: "https://2gis.ru/spb",
  hours: "Ежедневно, 10:00–20:00, по предварительной записи",
  hoursShort: "Ежедневно 10:00–20:00",
  openingHours: ["Mo-Su 10:00-20:00"],
  reviews: "",
  social: "",
  timeZone: "Europe/Moscow",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
export const navigation = [
  ["Главная", "/"],
  ["Услуги", "/#services"],
  ["Как записаться", "/#visit"],
  ["Цены", "/#prices"],
  ["Вопросы", "/#faq"],
  ["Контакты", "/#contacts"],
] as const;
