const PROJECTS_STATUS = [
  { label: "Wszystkie", value: "all" },
  { label: "W trakcie", value: "inProgress" },
  { label: "Planowane", value: "planned" },
  { label: "Zakończone", value: "completed" },
] as const;

export type ProjectFilter = (typeof PROJECTS_STATUS)[number]["value"];
export type ProjectCounts = Record<ProjectFilter, number>;

export const PROJECT_SORT_ORDERS = ["Najnowsze", "Najstarsze"] as const;
export type ProjectSortOrder = (typeof PROJECT_SORT_ORDERS)[number];

export default PROJECTS_STATUS;
