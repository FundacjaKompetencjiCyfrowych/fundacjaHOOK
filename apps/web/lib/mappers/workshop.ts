export const STATUS_TRANSLATIONS: Record<string, string> = {
  inProgress: "W trakcie",
  planned: "Planowane",
  completed: "Zakończone",
} as const;

export const translateGroup = (group?: string) => {
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
};
