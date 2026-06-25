import { Project } from "@/sanity/typegen";

export const PROJECTS_MAP: Record<string, string> = {
  inProgress: "W trakcie",
  planned: "Planowane",
  completed: "Zakończone",
} as const;

export type ProjectStatus = NonNullable<Project["status"]>;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  inProgress: "W trakcie",
  planned: "Planowany",
  completed: "Zakończony",
};

export const PROJECT_STATUS_VARIANTS: Record<ProjectStatus, "default" | "secondary" | "outline"> = {
  inProgress: "default",
  planned: "secondary",
  completed: "outline",
};

export function countValues(materials: Project[], key: "status"): Map<string, number> {
  const counts = new Map<string, number>();

  for (const material of materials) {
    const fieldValue = material[key];
    counts.set(fieldValue ?? "", (counts.get(fieldValue ?? "") ?? 0) + 1);
  }

  return counts;
}
