export const PROJECT_STATUSES = {
  inProgress: "inProgress",
  planned: "planned",
  completed: "completed",
} as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; shortLabel: string; variant: "inProgress" | "planned" | "completed" }
> = {
  inProgress: { label: "W trakcie", shortLabel: "W trakcie", variant: "inProgress" },
  planned: { label: "Planowane", shortLabel: "Planowane", variant: "planned" },
  completed: { label: "Zakończone", shortLabel: "Zakończone", variant: "completed" },
};

export const PROJECTS_MAP = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.shortLabel])
) as Record<ProjectStatus, string>;

export const PROJECT_STATUS_LABELS = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.label])
) as Record<ProjectStatus, string>;

export const PROJECT_STATUS_VARIANTS = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.variant])
) as Record<ProjectStatus, "inProgress" | "planned" | "completed">;
