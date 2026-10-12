import Link from "next/link";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import ProjectCard from "../../Cards/ProjectCard";
import WorkshopCard from "../../Cards/WorkshopCard";
import type { Project, Workshop } from "@/sanity/typegen";

// Temporary Sanity documents; replace these arrays with fetched documents later.
const documentMetadata = {
  _createdAt: "2026-04-01T00:00:00Z",
  _updatedAt: "2026-04-01T00:00:00Z",
  _rev: "home-preview",
};

const workshops: Workshop[] = [
  {
    ...documentMetadata,
    _id: "home-workshop-a",
    _type: "workshop",
    title: "Warsztat A",
    status: "inProgress",
    datetime: "2026-04-15T08:00:00Z",
    location: "Warszawa, ul. Przykładowa 10",
    duration: 3,
    group: "teen",
  },
  {
    ...documentMetadata,
    _id: "home-workshop-b",
    _type: "workshop",
    title: "Warsztat B",
    status: "inProgress",
    datetime: "2026-04-22T08:00:00Z",
    location: "Kraków, ul. Główna 5",
    duration: 2,
    group: "adult",
  },
];

const projects: Project[] = [
  {
    ...documentMetadata,
    _id: "home-project-kompas",
    _type: "project",
    title: "Projekt Kompas",
    status: "inProgress",
    description:
      "Program mentoringowy dla młodzieży z małych miejscowości, wspierający rozwój zawodowy i osobisty.",
  },
  {
    ...documentMetadata,
    _id: "home-project-mosty",
    _type: "project",
    title: "Projekt Mosty",
    status: "inProgress",
    description: "Inicjatywa łącząca pokolenia poprzez wspólne warsztaty i projekty społeczne.",
  },
  {
    ...documentMetadata,
    _id: "home-project-horyzont",
    _type: "project",
    title: "Projekt Horyzont",
    status: "planned",
    description: "Cykl szkoleń z kompetencji cyfrowych dla osób 50+.",
  },
];

export function HomeWorkshopsSection() {
  return (
    <section className="px-4 py-[38px] sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          Warsztaty
        </Typography>
        <Typography variant="body" className="mt-2 text-muted">
          Wprowadzenie do oferty warsztatowej fundacji.
        </Typography>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/workshops">Pokaż wszystkie</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeProjectsSection() {
  return (
    <section className="border-b border-subtle px-4 pb-20 pt-6 sm:px-6">
      <div className="mx-auto max-w-[1152px]">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          Aktualne projekty i wydarzenia
        </Typography>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
