import { format } from "date-fns/format";
import { pl } from "date-fns/locale/pl";

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const formatDatePolish = (date: Date): string => {
  return format(date, "dd.MM.yyyy", { locale: pl });
};
