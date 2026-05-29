import type { MaterialFilterItem } from "./materialyFilters.types";

export type { MaterialFilterItem } from "./materialyFilters.types";

export function toggleSet(current: Set<string>, value: string) {
  const next = new Set(current);

  if (next.has(value)) {
    next.delete(value);
    return next;
  }

  next.add(value);
  return next;
}

export function countValues(
  materials: MaterialFilterItem[],
  key: "event" | "type" | "area" | "format"
) {
  const counts = new Map<string, number>();

  for (const material of materials) {
    const fieldValue = material[key];
    counts.set(fieldValue, (counts.get(fieldValue) ?? 0) + 1);
  }

  return counts;
}

type FilterInput = {
  materials: MaterialFilterItem[];
  search: string;
  sort: "newest" | "oldest";
  selectedEvent: string;
  selectedTypes: Set<string>;
  selectedAreas: Set<string>;
  selectedFormats: Set<string>;
  dateFrom?: Date;
  dateTo?: Date;
};

export function filterAndSortMaterials({
  materials,
  search,
  sort,
  selectedEvent,
  selectedTypes,
  selectedAreas,
  selectedFormats,
  dateFrom,
  dateTo,
}: FilterInput) {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = materials.filter((material) => {
    const textMatches =
      normalizedSearch.length === 0 ||
      material.title.toLowerCase().includes(normalizedSearch) ||
      material.description.toLowerCase().includes(normalizedSearch);

    if (!textMatches) return false;

    if (selectedEvent !== "all" && material.event !== selectedEvent) return false;
    if (selectedTypes.size > 0 && !selectedTypes.has(material.type)) return false;
    if (selectedAreas.size > 0 && !selectedAreas.has(material.area)) return false;
    if (selectedFormats.size > 0 && !selectedFormats.has(material.format)) return false;

    const publicationDate = new Date(material.date);
    if (dateFrom && publicationDate < dateFrom) return false;
    if (dateTo && publicationDate > dateTo) return false;

    return true;
  });

  filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}

export function getActiveFilterCount(args: {
  selectedEvent: string;
  selectedTypes: Set<string>;
  selectedAreas: Set<string>;
  selectedFormats: Set<string>;
  dateFrom?: Date;
  dateTo?: Date;
}) {
  const { selectedEvent, selectedTypes, selectedAreas, selectedFormats, dateFrom, dateTo } = args;

  let total = 0;

  if (selectedEvent !== "all") total += 1;
  total += selectedTypes.size;
  total += selectedAreas.size;
  total += selectedFormats.size;
  if (dateFrom) total += 1;
  if (dateTo) total += 1;

  return total;
}
