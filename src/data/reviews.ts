export type Review = {
  id: string;
  author: string;
  text: string;
  date: string;
  sourceUrl: string;
  verified: boolean;
};
export const reviews: Review[] = [];
