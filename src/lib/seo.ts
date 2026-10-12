import { clinic } from "@/data/contacts";
import { animalPhotos } from "@/data/animal-photos";
export const sharedOpenGraph = {
  type: "website" as const,
  locale: "ru_RU",
  siteName: clinic.name,
  images: [
    {
      url: animalPhotos.hero.src,
      width: 3840,
      height: 2847,
      alt: animalPhotos.hero.alt,
    },
  ],
};
