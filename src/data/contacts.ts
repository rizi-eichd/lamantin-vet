export const clinic = {
  name: "Зоопрофи",
  city: "Мытищи",
  region: "Московская область",
  address: "ул. Троицкая, 9А",
  shortAddress: "Троицкая, 9А",
  floor: "2-й этаж",
  phone: "+7 (498) 602-97-93",
  phoneHref: "tel:+74986029793",
  maps: "https://yandex.ru/maps/org/zooprofi/198266295809/",
  route: "https://yandex.com/maps/?rtext=~55.904014,37.699186&rtt=auto",
  hours: "Круглосуточно, ежедневно",
  timeZone: "Europe/Moscow",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
export const navigation = [
  ["Главная", "/"],
  ["Услуги", "/#services"],
  ["Цены", "/#prices"],
  ["О клинике", "/#about"],
  ["Специалисты", "/#team"],
  ["Отзывы", "/#reviews"],
  ["Контакты", "/#contacts"],
] as const;
