import { sanityFetch } from "@/sanity/live";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import {
  PROJECTS_PAGE_SIZE,
  projectCountsQuery,
  projectsNewestQuery,
} from "@/sanity/queries/projects";
import type { Project } from "@/sanity/typegen";
import type { ProjectCounts } from "./_constants/projects";
import ProjectsPageClient from "./_components/ProjectsPageClient";

const ProjectsPage = async () => {
  const [{ data: projects }, { data: counts }] = await Promise.all([
    sanityFetch({
      query: projectsNewestQuery,
      params: { status: "all", start: 0, end: PROJECTS_PAGE_SIZE },
    }),
    sanityFetch({ query: projectCountsQuery }),
  ]);

  return (
    <>
      <Breadcrumbs segments={[{ label: "Projekty" }]} />
      <ProjectsPageClient
        initialProjects={projects as Project[]}
        counts={counts as ProjectCounts}
      />
    </>
  );
};

export default ProjectsPage;
