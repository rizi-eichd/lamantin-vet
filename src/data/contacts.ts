export const clinic = {
  name: "Здоровый питомец",
  city: "Первоуральск",
  address: "ул. Береговая, 10А",
  phone: "+7 (900) 200-27-30",
  phoneHref: "tel:+79002002730",
  maps: "https://yandex.com/maps/org/zdorovy_pitomets/1806839452/",
  route: "https://yandex.com/maps/?rtext=~56.914675,59.946196&rtt=auto",
  hours: null as string | null,
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
