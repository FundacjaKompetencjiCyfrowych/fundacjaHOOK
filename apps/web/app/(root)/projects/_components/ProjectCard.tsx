import Link from "next/link";

import { StatusBadge } from "@/app/_components/ui/status-badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Project } from "@/sanity/typegen";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = `/projects/${project.slug?.current || "not-found"}`;
  const status = project.status ?? "planned";

  return (
    <Link href={href} className="block h-full">
      <Card className="gap-2 rounded-lg bg-[#f5f3f0] shadow-md hover:shadow-lg pt-0 border-0 focus-within:ring-2 focus-within:ring-ring/50 h-full transition-all hover:-translate-y-0.5 duration-150">
        <div className="relative mx-4 mt-4 h-32 min-w-0 overflow-hidden rounded-xl">
          {project.image ? (
            <SanityImage
              image={project.image}
              width={536}
              height={128}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center border border-subtle border-dashed bg-placeholder text-sm text-muted-foreground">
              [IMAGE PLACEHOLDER]
            </div>
          )}
        </div>
        <CardHeader className="gap-2">
          <CardTitle className="flex flex-wrap items-center gap-2 text-sm leading-tight">
            <span className="font-medium text-foreground">{project.title}</span>
            <StatusBadge status={status} />
          </CardTitle>
          <CardDescription className="text-xs leading-[1.4] tracking-[0.02em] text-muted-foreground">
            {project.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
