import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Typography } from "@/app/_components/ui/typography";
import ProjectCard from "@/app/_components/Projects/ProjectCard";
import type { Project } from "@/sanity/typegen";

export function HomeProjectsSection({
  title,
  subtitle,
  items = [],
}: {
  title?: string;
  subtitle?: string;
  items?: Project[];
} = {}) {
  if (!items.length) return null;

  return (
    <section className="border-b border-subtle px-4 pb-20 pt-6 sm:px-6">
      <div className="mx-auto max-w-[1152px]">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body" className="mt-2 text-muted">
            {subtitle}
          </Typography>
        ) : null}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/projects">Pokaż wszystkie</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
