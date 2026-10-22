export type MaterialsPageFilters = {
  search: string;
  sort: "newest" | "oldest";
  event: string;
  types: string[];
  areas: string[];
  formats: string[];
  dateFrom: string | null;
  dateTo: string | null;
};
