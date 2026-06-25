"use client";

import ProjectFilters from "@/app/_components/Filtering/ProjectFilters";
import SortByOrder from "@/app/_components/Filtering/SortByOrder";
import { Project } from "@/sanity/typegen";
import { useState } from "react";

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

  return (
    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-6">
      <ProjectFilters counts={counts} filter={filter} setFilter={setFilter} />
      <SortByOrder sort={sortBy} setSort={setSortBy} />
    </div>
  );
};

export default ProjectPageClient;
