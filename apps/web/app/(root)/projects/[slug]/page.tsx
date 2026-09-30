import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar1, MapPin } from "lucide-react";

import { StatusBadge } from "@/app/_components/ui/status-badge";
import { Card } from "@/app/_components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { client } from "@/sanity/client";
import { SanityImage } from "@/sanity/image/SanityImage";
import { sanityFetch } from "@/sanity/live";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/queries/projects";
import { Project } from "@/sanity/typegen";
import { cacheLife } from "next/cache";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import ROUTES from "@/constants/routes";

type ProjectEvent = {
  _id: string;
  title?: string;
  date?: string;
  location?: string;
};

type ProjectWithResolvedEvents = Omit<Project, "events"> & {
  events?: ProjectEvent[];
};

type ProjectSlugItem = {
  slug?: string | null;
};

async function getProjects() {
  "use cache";
  cacheLife("days");

  const data = await client.fetch<ProjectSlugItem[]>(
    projectSlugsQuery,
    {},
    { perspective: "published", stega: false }
  );

  return data || [];
}

export async function generateStaticParams() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return [{ slug: "not-found" }];
  }

  return projects
    .filter((project): project is { slug: string } => !!project.slug)
    .map((project) => ({ slug: project.slug }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug },
  });

  const project = data as ProjectWithResolvedEvents | null;

  if (!project) notFound();

  const status = project.status ?? "planned";
  const title = project.title ?? "Projekt";
  const dateRange = [project.startDate, project.endDate]
    .filter((date): date is string => Boolean(date))
    .map(formatDate)
    .join(" - ");

  return (
    <>
      <Breadcrumbs segments={[{ label: "Projekty", href: ROUTES.PROJECTS }, { label: title }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <PageTitle>{title}</PageTitle>
              <StatusBadge status={status} />
            </div>
          </div>
          {dateRange && (
            <p className="mt-2 mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar1 size={14} />
              {dateRange}
            </p>
          )}
          <Link
            href={ROUTES.PROJECTS}
            className="block mt-6 mb-6 font-medium text-brand-primary hover:text-brand-onhover text-sm"
          >
            ← Wróć do listy
          </Link>

          <div className="relative mb-6 h-64 rounded-lg overflow-hidden">
            {project.image ? (
              <SanityImage
                image={project.image}
                width={1200}
                height={480}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-placeholder text-sm text-muted-foreground">
                [IMAGE PLACEHOLDER]
              </div>
            )}
          </div>

          {project.description && (
            <p className="mb-4 text-base leading-[1.1] tracking-[-0.01em] text-muted">
              {project.description}
            </p>
          )}

          {project.article && (
            <div className="text-main whitespace-pre-line">{project.article}</div>
          )}

          {project.events && project.events.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-foreground text-xl">Wydarzenia w ramach projektu</h2>
              <div className="space-y-3 mt-4">
                {project.events.map((event) => (
                  <Card
                    key={event._id}
                    className="gap-1 bg-elevated shadow-sm py-3 rounded-xl ring-1 ring-foreground/5"
                  >
                    <div className="px-4">
                      <h3 className="font-medium text-foreground text-sm">{event.title}</h3>
                      <div className="space-y-1 mt-1 text-muted-foreground text-sm">
                        {event.date && (
                          <p className="flex items-center gap-2">
                            <Calendar1 size={14} />
                            {formatDate(event.date)}
                          </p>
                        )}
                        {event.location && (
                          <p className="flex items-center gap-2">
                            <MapPin size={14} />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
