"use client";

import ProjectCard from "@/app/_components/Cards/ProjectCard";
import ProjectFilters from "@/app/_components/Filtering/ProjectFilters";
import SortByOrder from "@/app/_components/Filtering/SortByOrder";
import { Button } from "@/app/_components/ui/button";
import { filterProjects, sortProjects } from "@/lib/projectHelpers";
import { Project } from "@/sanity/typegen";
import { useMemo, useState } from "react";

const getProjectsLabel = (count: number) => {
  if (count === 1) return "projekt";
  return "projektów";
};

const ProjectPageClient = ({
  projects,
  counts,
}: {
  projects: Project[];
  counts: Record<string, number>;
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Najnowsze");

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = filterProjects(projects, filter);
    return sortProjects(filtered, sortBy);
  }, [filter, projects, sortBy]);

  const visibleProjects = showAllProjects
    ? filteredAndSortedProjects
    : filteredAndSortedProjects.slice(0, 3);

  return (
    <section className="px-4 py-8 sm:py-10 border-subtle border-b wire-section">
      <div className="mx-auto container">
        <header className="mb-6">
          <h1 className="font-bold text-foreground text-4xl sm:text-5xl leading-tight">Projekty</h1>
          <p className="mt-2 max-w-xl text-muted-foreground text-base">
            Poznaj nasze bieżące i planowane projekty społeczne.
          </p>
        </header>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4 mb-6">
          <ProjectFilters counts={counts} filter={filter} setFilter={setFilter} />
          <div className="flex flex-col items-start lg:items-end gap-2">
            <p className="text-muted-foreground text-sm">
              {projects.length} {getProjectsLabel(projects.length)}
            </p>
            <SortByOrder sort={sortBy} setSort={setSortBy} />
          </div>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-card px-6 py-10 border border-border border-dashed rounded-xl text-muted-foreground text-center">
            Brak projektów dla wybranego filtra.
          </div>
        )}

        {filteredAndSortedProjects.length > 3 && (
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="bg-brand-primary hover:bg-brand-onhover px-7 rounded-full text-white"
            >
              {showAllProjects ? "Pokaż mniej" : "Pokaż wszystkie"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectPageClient;
