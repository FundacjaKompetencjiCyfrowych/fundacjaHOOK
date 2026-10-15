export function getHoursLabel(count: number): string {
  if (count === 1) return "godzina";

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
    return "godziny";
  }

  return "godzin";
}

export function getFormattedWorkshopDate(dateStr?: string): string | null {
  return dateStr
    ? new Date(dateStr).toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
}

export function mapGroup(group?: string): string | undefined {
  switch (group) {
    case "adult":
      return "Dorośli 18+";
    case "teen":
      return "Młodzież 14-18 lat";
    case "children":
      return "Dzieci 8-13 lat";
    case "family":
      return "Rodziny z dziećmi";
    default:
      return group;
  }
}
