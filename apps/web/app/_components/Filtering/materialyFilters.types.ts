import type { ContentItemType } from "@/app/_components/Cards/ContentItem";

export type MaterialFilterItem = ContentItemType & {
  event: string;
  type: string;
  area: string;
};

export const WYDARZENIA = ["Warsztaty", "Konferencja", "Webinar", "Szkolenie", "Inne"] as const;

export const TYPY = [
  "Workbook",
  "Checklist",
  "Poradnik",
  "Publikacja",
  "Nagranie wideo",
  "Szablon",
  "Infografika",
  "Inne",
] as const;

export const OBSZARY = [
  "Zdrowie",
  "Prawo",
  "Finanse",
  "Kariera",
  "Rozwój Osobisty",
  "Rodzicielstwo",
  "Inne",
] as const;

export const FORMATY = ["PDF", "Zip", "MP4", "Link", "Inne"] as const;
