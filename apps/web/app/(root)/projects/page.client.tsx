"use client";

import ProjectCard from "@/app/_components/Cards/ProjectCard";
import ProjectFilters from "@/app/_components/Filtering/ProjectFilters";
import SortByOrder from "@/app/_components/Filtering/SortByOrder";
import { filterProjects, sortProjects } from "@/lib/projectHelpers";
import { Project } from "@/sanity/typegen";
import { useMemo, useState } from "react";

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
    <>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-6">
        <ProjectFilters counts={counts} filter={filter} setFilter={setFilter} />
        <SortByOrder sort={sortBy} setSort={setSortBy} />
      </div>
      {visibleProjects.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-card px-6 py-10 border border-border border-dashed rounded-xl text-muted-foreground text-center">
          Brak projektow dla wybranego filtra.
        </div>
      )}
      {filteredAndSortedProjects.length > 3 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="bg-brand-primary hover:bg-brand-onhover px-6 py-2 rounded-lg font-medium text-white transition-colors"
          >
            {showAllProjects ? "Zobacz mniej" : "Załaduj więcej"}
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectPageClient;
