import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/sanity/client";
import { SanityImage } from "@/sanity/image/SanityImage";
import { sanityFetch } from "@/sanity/live";
import { projectBySlugQuery, projectsQuery } from "@/sanity/queries/projects";

async function getProjects() {
  const data = await client.fetch(projectsQuery, {}, { perspective: "published", stega: false });

  return data || [];
}

export async function generateStaticParams() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return [{ slug: "not-found" }];
  }

  return projects
    .filter(
      (project): project is (typeof projects)[number] & { slug: { current: string } } =>
        project.slug !== null && project.slug !== undefined && project.slug.current !== undefined
    )
    .map((project) => ({ slug: project.slug.current }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <section className="wire-section">
      <div className="mx-auto container">
        <Link
          href="/projects"
          className="block mb-4 font-medium text-brand-primary hover:text-brand-onhover"
        >
          ← Wróć do listy
        </Link>

        <h1 className="mb-4 font-bold text-main text-2xl">{project.title}</h1>

        {project.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <SanityImage
              image={project.image}
              width={1200}
              height={480}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {project.description && <p className="mb-4 text-muted">{project.description}</p>}

        {project.article && <div className="text-main whitespace-pre-line">{project.article}</div>}
      </div>
    </section>
  );
}
