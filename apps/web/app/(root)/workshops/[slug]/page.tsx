import { SanityImage } from "@/sanity/image/SanityImage";
import { workshopDetailsQuery } from "@/sanity/queries/workshopDetails";
import { sanityFetch } from "@/sanity/live";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { Calendar1, MapPin, Download, LogIn } from "lucide-react";
import { getFormattedWorkshopDate, mapStatus } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { workshopSlugsQuery } from "@/sanity/queries/workshopDetails";
import { client } from "@/sanity/client";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

async function getWorkshops() {
  "use cache";
  cacheLife("days");

  const data = await client.fetch(
    workshopSlugsQuery,
    {},
    { perspective: "published", stega: false }
  );
  return data || [];
}

export async function generateStaticParams() {
  const workshops = await getWorkshops();

  if (!workshops || workshops.length === 0) {
    return [{ slug: "not-found" }];
  }

  return workshops
    .filter(
      (workshop): workshop is { slug: string } =>
        workshop.slug !== null && workshop.slug !== undefined
    )
    .map((workshop) => ({
      slug: workshop.slug,
    }));
}

interface WorkshopPageProps {
  params: Promise<{ slug: string }>;
}

async function WorkshopPageContent({ params }: WorkshopPageProps) {
  const { slug } = await params;

  return <WorkshopContent slug={slug} />;
}

async function WorkshopContent({ slug }: { slug: string }) {
  const { data } = await sanityFetch({
    query: workshopDetailsQuery,
    params: { slug },
  });

  if (!data) notFound();

  const workshop = data;
  const formattedDate = workshop.datetime ? getFormattedWorkshopDate(workshop.datetime) : null;

  return (
    <main className="w-full min-h-screen">
      {/* Header with back link */}
      <div className="bg-sunken px-4 sm:px-8 py-4 w-full">
        <Link
          href="/workshops"
          className="font-medium text-brand-primary hover:text-brand-onhover text-sm"
        >
          ← Wróć do listy
        </Link>
      </div>

      {/* Main content */}
      <div className="mx-auto px-4 sm:px-8 py-12 w-full max-w-3xl">
        {/* Title with Badge */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <h1 className="font-bold text-3xl sm:text-4xl">{workshop.title}</h1>
            {workshop.status && (
              <Badge
                variant={workshop.status === "inProgress" ? "default" : "outline"}
                className="mt-2 font-normal text-xs whitespace-nowrap"
              >
                {mapStatus(workshop.status)}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {workshop.description && (
          <p className="mb-8 text-main text-base leading-relaxed">{workshop.description}</p>
        )}

        {/* Workshop image */}
        <div className="mb-10 rounded-lg overflow-hidden">
          <SanityImage
            image={workshop.image}
            width={800}
            height={400}
            className="w-full h-64 sm:h-96 object-cover"
          />
        </div>

        <div className="space-y-6 mb-10">
          {/* Termin warsztatu */}
          {formattedDate && (
            <div className="pb-6">
              <h3 className="mb-4 font-bold text-lg">Termin warsztatu</h3>
              <div className="flex items-center gap-3 text-main">
                <Calendar1 size={20} className="text-brand-primary shrink-0" />
                <span className="text-base">{formattedDate}</span>
              </div>
            </div>
          )}

          {/* Regulamin */}
          {workshop.materials?.asset?.url && (
            <div className="space-y-6">
              <h3 className="mb-1 font-bold text-sm">Regulamin</h3>
              <a
                href={workshop.materials.asset.url}
                download={workshop.materials.asset.originalFilename || "materials"}
                className="inline-flex items-center gap-2 hover:bg-elevated active:bg-elevated px-3 py-2 border border-border rounded-lg font-medium text-foreground text-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                Pobierz regulamin (PDF)
              </a>
            </div>
          )}
        </div>

        {/* Lokalizacja */}
        {workshop.location && (
          <div className="pb-6">
            <h3 className="mb-4 font-bold text-lg">Lokalizacja</h3>
            <div className="flex items-center gap-3 mb-4 text-main">
              <MapPin size={20} className="text-brand-primary shrink-0" />
              <span className="text-base">{workshop.location}</span>
            </div>
            <div className="flex justify-center items-center bg-elevated rounded-lg h-48 text-muted">
              [MAP / LOCATION PLACEHOLDER]
            </div>
          </div>
        )}

        {/* Workshop info grid */}
        {/* <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 pb-6">
          {workshop.duration && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Timer size={18} className="text-brand-primary" />
                <span className="font-semibold text-sm">Czas trwania</span>
              </div>
              <p className="text-main">
                {workshop.duration} {getHoursLabel(Number(workshop.duration))}
              </p>
            </div>
          )}

          {workshop.group && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-brand-primary" />
                <span className="font-semibold text-sm">Grupa docelowa</span>
              </div>
              <p className="text-main">{mapGroup (workshop.group)}</p>
            </div>
          )}
        </div> */}

        {/* Materials download section */}
        {/* Action buttons */}
        <div className="flex sm:flex-row flex-col gap-3">
          {workshop.signupFormUrl && (
            <a href={workshop.signupFormUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-brand-primary hover:bg-brand-onhover text-white">
                <LogIn size={18} className="mr-2" />
                Zapisz się
              </Button>
            </a>
          )}

          {workshop.materials?.asset?.url && (
            <a
              href={workshop.materials.asset.url}
              download={workshop.materials.asset.originalFilename || "materials"}
              className="sm:flex-initial"
            >
              <Button className="bg-brand-primary hover:bg-brand-onhover text-white">
                <Download size={18} className="mr-2" />
                Pobierz materiały
              </Button>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  return (
    <Suspense
      fallback={<div className="flex justify-center items-center min-h-screen">Ładowanie...</div>}
    >
      <WorkshopPageContent params={params} />
    </Suspense>
  );
}
