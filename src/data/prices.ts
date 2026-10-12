import { activeServices } from "./services";
export const prices = activeServices.map((s) => ({
  serviceSlug: s.slug,
  title: s.title,
  category: s.category,
  price: null as number | null,
}));
