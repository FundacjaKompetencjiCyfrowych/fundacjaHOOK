import { sanityFetch } from "@/sanity/live";
import projectsQuery from "@/sanity/queries/projects";
import { countValues } from "@/lib/mappers/projects";
import ProjectPageClient from "./page.client";

const ProjectsPage = async () => {
  const { data: projects } = await sanityFetch({
    query: projectsQuery,
  });

  // Count projects by status
  const statusCounts = countValues(projects, "status");

  // Convert Map to Record for ProjectFilters
  const counts: Record<string, number> = {
    all: projects.length,
    inProgress: statusCounts.get("inProgress") ?? 0,
    planned: statusCounts.get("planned") ?? 0,
    completed: statusCounts.get("completed") ?? 0,
  };

  return <ProjectPageClient projects={projects} counts={counts} />;
};

export default ProjectsPage;
