import Link from "next/link";

import { PROJECT_STATUS_LABELS, PROJECT_STATUS_VARIANTS } from "@/lib/mappers/projects";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import { Project } from "@/sanity/typegen";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const href = `/projects/${project.slug?.current || "not-found"}`;
  const status = project.status ?? "planned";

  return (
    <Link href={href} className="block h-full">
      <Card className="gap-2 bg-card shadow-md hover:shadow-lg pt-0 border border-border focus-within:ring-2 focus-within:ring-ring/50 h-full transition-all hover:-translate-y-0.5 duration-150">
        <div className="px-4 pt-4">
          {project.image ? (
            <SanityImage
              image={project.image}
              width={536}
              height={256}
              className="rounded-xl w-full h-32 object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-placeholder border border-subtle border-dashed rounded-xl h-32 text-muted-foreground text-sm">
              [IMAGE PLACEHOLDER]
            </div>
          )}
        </div>
        <CardHeader className="gap-2">
          <CardTitle className="flex flex-wrap items-center gap-2 text-base leading-tight">
            <span className="font-bold text-foreground">{project.title}</span>
            <Badge variant={PROJECT_STATUS_VARIANTS[status]} className="text-[10px]">
              {PROJECT_STATUS_LABELS[status]}
            </Badge>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm leading-snug">
            {project.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProjectCard;
