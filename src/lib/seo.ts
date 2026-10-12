import { clinic } from "@/data/contacts";
export const sharedOpenGraph = {
  type: "website" as const,
  locale: "ru_RU",
  siteName: clinic.name,
  images: [
    {
      url: "/images/pets.webp",
      width: 960,
      height: 1280,
      alt: "Собака и кошка — фотография из карточки клиники",
    },
  ],
};
