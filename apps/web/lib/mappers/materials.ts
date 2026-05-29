import type { MaterialFilterItem } from "@/app/_components/Filtering/materialyFilters.types";

type MaterialAsset = {
  url?: string | null;
  extension?: string | null;
  size?: number | null;
};

export type MaterialQueryItem = {
  _id: string;
  title?: string | null;
  description?: string | null;
  date?: string | null;
  event?: string | null;
  type?: string | null;
  area?: string | null;
  format?: string | null;
  size?: string | null;
  placements?: string[] | null;
  fileAsset?: MaterialAsset | null;
};

const FALLBACK_TEXT = "Brak danych";
const FALLBACK_DATE = "1970-01-01";
const FALLBACK_URL = "#";

const EVENT_MAP: Record<string, string> = {
  warsztaty: "Warsztaty",
  konferencja: "Konferencja",
  webinar: "Webinar",
  szkolenie: "Szkolenie",
  inne: "Inne",
};

const TYPE_MAP: Record<string, string> = {
  workbook: "Workbook",
  checklist: "Checklist",
  poradnik: "Poradnik",
  publikacja: "Publikacja",
  "nagranie wideo": "Nagranie wideo",
  "nagranie video": "Nagranie wideo",
  szablon: "Szablon",
  infografika: "Infografika",
  inne: "Inne",
};

const AREA_MAP: Record<string, string> = {
  zdrowie: "Zdrowie",
  prawo: "Prawo",
  finanse: "Finanse",
  kariera: "Kariera",
  "rozwój osobisty": "Rozwój Osobisty",
  rodzicielstwo: "Rodzicielstwo",
  inne: "Inne",
};

const FORMAT_MAP: Record<string, string> = {
  pdf: "PDF",
  zip: "Zip",
  mp4: "MP4",
  link: "Link",
  inne: "Inne",
};

function normalizeEnumValue(value: string | null | undefined, dictionary: Record<string, string>) {
  if (!value) return "Inne";
  const normalized = value.trim().toLowerCase();
  return dictionary[normalized] ?? "Inne";
}

function toReadableFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "N/A";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;

  return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`;
}

function toFormatLabel(format?: string | null, extension?: string | null) {
  if (format && format.trim().length > 0) {
    return normalizeEnumValue(format, FORMAT_MAP);
  }

  if (!extension) return "Inne";
  return normalizeEnumValue(extension, FORMAT_MAP);
}

function toSizeLabel(size?: string | null, bytes?: number | null) {
  if (size && size.trim().length > 0) return size;
  return toReadableFileSize(bytes);
}

export function mapMaterialToFilterItem(item: MaterialQueryItem): MaterialFilterItem {
  return {
    title: item.title ?? FALLBACK_TEXT,
    description: item.description ?? FALLBACK_TEXT,
    date: item.date ?? FALLBACK_DATE,
    event: normalizeEnumValue(item.event, EVENT_MAP),
    type: normalizeEnumValue(item.type, TYPE_MAP),
    area: normalizeEnumValue(item.area, AREA_MAP),
    fileUrl: item.fileAsset?.url ?? FALLBACK_URL,
    format: toFormatLabel(item.format, item.fileAsset?.extension),
    size: toSizeLabel(item.size, item.fileAsset?.size),
  };
}

export function mapMaterialsToFilterItems(items: MaterialQueryItem[] | null | undefined) {
  if (!items) return [];
  return items.map(mapMaterialToFilterItem);
}
