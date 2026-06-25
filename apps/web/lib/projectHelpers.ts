import { Project } from "@/sanity/typegen";

export const getProjectTimestamp = (project: Project) => {
  const dateSource = project.startDate ?? project._createdAt;
  return dateSource ? new Date(dateSource).getTime() : 0;
};

/**
 * Filtruje projekty na podstawie statusu
 */
export const filterProjects = (projects: Project[], filter: string) => {
  if (!projects) return [];
  if (filter === "all") return projects;
  return projects.filter((project) => project.status === filter);
};

/**
 * Sortuje projekty na podstawie kryterium ("Najstarsze" lub inne)
 * Zwraca nową tablicę, nie mutuje oryginalnej.
 */
export const sortProjects = (projects: Project[], sortBy: string) => {
  if (!projects) return [];

  return [...projects].sort((a, b) => {
    const timeA = getProjectTimestamp(a);
    const timeB = getProjectTimestamp(b);

    return sortBy === "Najstarsze" ? timeA - timeB : timeB - timeA;
  });
};
