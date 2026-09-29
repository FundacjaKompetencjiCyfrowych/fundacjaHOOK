"use server";

import type { ProjectFilter, ProjectSortOrder } from "../_constants/projects";
import { sanityFetch } from "@/sanity/live";
import {
  PROJECTS_PAGE_SIZE,
  projectsNewestQuery,
  projectsOldestQuery,
} from "@/sanity/queries/projects";
import type { Project } from "@/sanity/typegen";

export async function loadProjectsPage(
  start: number,
  filter: ProjectFilter,
  sortBy: ProjectSortOrder
): Promise<Project[]> {
  const query = sortBy === "Najstarsze" ? projectsOldestQuery : projectsNewestQuery;
  const { data } = await sanityFetch({
    query,
    params: {
      status: filter,
      start,
      end: start + PROJECTS_PAGE_SIZE,
    },
  });

  return data as Project[];
}
