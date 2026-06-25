import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar1, MapPin } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_VARIANTS } from "@/lib/mappers/projects";
import { client } from "@/sanity/client";
import { SanityImage } from "@/sanity/image/SanityImage";
import { sanityFetch } from "@/sanity/live";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/queries/projects";
import { Project } from "@/sanity/typegen";
import { cacheLife } from "next/cache";

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
  const dateRange = `${formatDate(project.startDate ?? "")} - ${formatDate(project.endDate ?? "")}`;

  return (
    <section className="px-4 py-8 sm:py-10 border-subtle border-b wire-section">
      <div className="mx-auto container">
        <Link
          href="/projects"
          className="block mb-4 font-medium text-brand-primary hover:text-brand-onhover"
        >
          ← Wróć do listy
        </Link>

        <div className="bg-placeholder mb-5 border border-subtle rounded-xl overflow-hidden">
          {project.image ? (
            <SanityImage
              image={project.image}
              width={1600}
              height={520}
              className="w-full h-55 sm:h-75 object-cover"
            />
          ) : (
            <div className="flex justify-center items-center h-55 sm:h-75 text-muted-foreground text-sm">
              [IMAGE PLACEHOLDER]
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="font-bold text-foreground text-4xl sm:text-5xl leading-tight">
            {project.title}
          </h1>
          <Badge variant={PROJECT_STATUS_VARIANTS[status]} className="text-[10px]">
            {PROJECT_STATUS_LABELS[status]}
          </Badge>
        </div>

        {dateRange && (
          <p className="flex items-center gap-2 mb-5 text-muted-foreground text-sm">
            <Calendar1 size={14} />
            {dateRange}
          </p>
        )}

        {project.description && (
          <p className="max-w-4xl text-foreground text-base leading-relaxed">
            {project.description}
          </p>
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
                    <h3 className="font-bold text-foreground text-lg">{event.title}</h3>
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
  );
}
