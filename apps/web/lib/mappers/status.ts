export const STATUS_TRANSLATIONS: Record<string, string> = {
  inProgress: "W trakcie",
  planned: "Planowane",
  completed: "Zakończone",
} as const;

export function mapStatus(status?: keyof typeof STATUS_TRANSLATIONS) {
  if (!status) return null;
  return STATUS_TRANSLATIONS[status] || status;
}
