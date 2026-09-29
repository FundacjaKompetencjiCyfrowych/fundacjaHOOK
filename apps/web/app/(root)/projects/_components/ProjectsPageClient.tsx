"use client";

import LoadMoreButton from "@/app/_components/Buttons/LoadMoreButton";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { usePaginatedItems } from "@/lib/hooks/usePaginatedItems";
import { PROJECTS_PAGE_SIZE } from "@/sanity/queries/projects";
import type { Project } from "@/sanity/typegen";
import { useCallback, useState } from "react";
import { loadProjectsPage } from "../_actions/loadProjectsPage";
import type { ProjectCounts, ProjectFilter, ProjectSortOrder } from "../_constants/projects";
import ProjectCard from "./ProjectCard";
import ProjectSortSelect from "./ProjectSortSelect";
import ProjectStatusFilters from "./ProjectStatusFilters";

interface ProjectsPageClientProps {
  initialProjects: Project[];
  counts: ProjectCounts;
}

const getProjectsLabel = (count: number) => {
  if (count === 1) return "projekt";
  return "projektów";
};

export default function ProjectsPageClient({ initialProjects, counts }: ProjectsPageClientProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [sortBy, setSortBy] = useState<ProjectSortOrder>("Najnowsze");
  const loadFilteredProjects = useCallback(
    (start: number) => loadProjectsPage(start, filter, sortBy),
    [filter, sortBy]
  );
  const pagination = usePaginatedItems({
    initialItems: initialProjects,
    pageSize: PROJECTS_PAGE_SIZE,
    loadItemsAction: loadFilteredProjects,
    resetKey: `${filter}:${sortBy}`,
  });

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-6">
          <PageTitle>Projekty</PageTitle>
          <p className="mt-2 max-w-xl text-muted-foreground text-base">
            Poznaj nasze bieżące i planowane projekty społeczne.
          </p>
        </header>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4 mb-6">
          <ProjectStatusFilters counts={counts} activeFilter={filter} onFilterChange={setFilter} />
          <div className="flex flex-col items-start lg:items-end gap-2">
            <p className="text-muted-foreground text-sm">
              {counts.all} {getProjectsLabel(counts.all)}
            </p>
            <ProjectSortSelect sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {pagination.items.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {pagination.items.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-card px-6 py-10 border border-border border-dashed rounded-xl text-muted-foreground text-center">
            Brak projektów dla wybranego filtra.
          </div>
        )}

        <LoadMoreButton pagination={pagination} />
      </div>
    </section>
  );
}
