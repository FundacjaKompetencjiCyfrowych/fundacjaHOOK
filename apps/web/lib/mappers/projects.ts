import { Project } from "@/sanity/typegen";

export const PROJECT_STATUSES = {
  inProgress: "inProgress",
  planned: "planned",
  completed: "completed",
} as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; shortLabel: string; variant: "default" | "secondary" | "outline" }
> = {
  inProgress: { label: "W trakcie", shortLabel: "W trakcie", variant: "default" },
  planned: { label: "Planowany", shortLabel: "Planowane", variant: "secondary" },
  completed: { label: "Zakończony", shortLabel: "Zakończone", variant: "outline" },
};

export const PROJECTS_MAP = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.shortLabel])
) as Record<ProjectStatus, string>;

export const PROJECT_STATUS_LABELS = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.label])
) as Record<ProjectStatus, string>;

export const PROJECT_STATUS_VARIANTS = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([key, val]) => [key, val.variant])
) as Record<ProjectStatus, "default" | "secondary" | "outline">;

export function countValues(materials: Project[], key: "status"): Map<string, number> {
  const counts = new Map<string, number>();

  for (const material of materials) {
    const fieldValue = material[key];
    counts.set(fieldValue ?? "", (counts.get(fieldValue ?? "") ?? 0) + 1);
  }

  return counts;
}
