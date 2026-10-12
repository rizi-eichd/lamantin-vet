// Illustrative animal photography. These are not confirmed clinic patients.
export const animalPhotos = {
  hero: {
    src: "/images/animals/hero-dog-4k.webp",
    alt: "Золотистый ретривер на прогулке среди зелени",
    author: "Rajesh S Balouria",
    source:
      "https://www.pexels.com/photo/golden-retriever-close-up-outdoors-in-summer-40009088/",
    position: "50% 40%",
  },
  booking: {
    src: "/images/animals/booking-cat-4k.webp",
    alt: "Белая кошка с зелёными глазами в мягком дневном свете",
    position: "50% 42%",
  },
  menu: {
    src: "/images/animals/menu-dog-4k.webp",
    alt: "Рыжая собака с белой мордой в профиль",
    position: "44% 50%",
  },
  consultation: {
    src: "/images/animals/consultation-dog-4k.webp",
    alt: "Чёрно-белая собака смотрит в камеру",
    position: "50% 42%",
  },
  prevention: {
    src: "/images/animals/prevention-dog-4k.webp",
    alt: "Белая собака с тёмным носом на улице",
    position: "60% 50%",
  },
  diagnostic: {
    src: "/images/animals/diagnostic-cat-4k.webp",
    alt: "Пушистая чёрная кошка выглядывает из окна",
    position: "64% 68%",
  },
  resting: {
    src: "/images/animals/resting-cat-4k.webp",
    alt: "Полосатая кошка отдыхает на мягком пледе",
    position: "50% 50%",
  },
  portrait: {
    src: "/images/animals/portrait-cat-4k.webp",
    alt: "Чёрно-белый фотопортрет полосатой кошки",
    position: "50% 47%",
  },
} as const;

export const servicePhotos: Record<
  string,
  (typeof animalPhotos)[keyof typeof animalPhotos]
> = {
  consultation: animalPhotos.consultation,
  vaccination: animalPhotos.prevention,
  ultrasound: animalPhotos.diagnostic,
  surgery: animalPhotos.resting,
  sterilization: animalPhotos.portrait,
  dentistry: animalPhotos.booking,
  parasites: animalPhotos.prevention,
  microchip: animalPhotos.consultation,
  grooming: animalPhotos.portrait,
  "home-visit": animalPhotos.menu,
};
