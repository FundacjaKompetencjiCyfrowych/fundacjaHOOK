import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STATUS_TRANSLATIONS } from "./mappers/workshop";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utlis used in workshop card

export const getHoursLabel = (count: number) => {
  if (count === 1) return "godzina";

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
    return "godziny";
  }

  return "godzin";
};

export const translateStatus = (status?: keyof typeof STATUS_TRANSLATIONS) => {
  if (!status) return null;
  return STATUS_TRANSLATIONS[status] || status;
};

export const getFormattedWorkshopDate = (dateStr?: string) => {
  return dateStr
    ? new Date(dateStr).toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
};

// Utlis used in workshop card
