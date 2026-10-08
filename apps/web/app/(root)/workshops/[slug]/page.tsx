import { SanityImage } from "@/sanity/image/SanityImage";
import { workshopDetailsQuery } from "@/sanity/queries/workshopDetails";
import { sanityFetch } from "@/sanity/live";
import { Button } from "@/app/_components/ui/button";
import { Calendar1, MapPin, Download, LogIn } from "lucide-react";
import { getFormattedWorkshopDate } from "@/lib/utils";
import { getDownloadUrl } from "@/lib/getDownloadUrl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { workshopSlugsQuery } from "@/sanity/queries/workshopDetails";
import { client } from "@/sanity/client";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { StatusBadge } from "@/app/_components/ui/status-badge";
import ROUTES from "@/constants/routes";

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
  const title = workshop.title ?? "Warsztat";
  const formattedDate = workshop.datetime ? getFormattedWorkshopDate(workshop.datetime) : null;
  const regulationFileType = workshop.regulations?.asset?.extension?.toUpperCase();

  return (
    <>
      <Breadcrumbs segments={[{ label: "Warsztaty", href: ROUTES.WORKSHOPS }, { label: title }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <PageTitle>{title}</PageTitle>
              <StatusBadge status={workshop.status} />
            </div>
          </div>
          {formattedDate && (
            <p className="mt-2 mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar1 size={14} />
              {formattedDate}
            </p>
          )}
          <Link
            href={ROUTES.WORKSHOPS}
            className="block mt-6 mb-6 font-medium text-brand-primary hover:text-brand-onhover text-sm"
          >
            ← Wróć do listy
          </Link>

          {/* Workshop image */}
          <div className="relative mb-6 h-64 rounded-lg overflow-hidden">
            <SanityImage
              image={workshop.image}
              width={1200}
              height={480}
              fill
              className="object-cover"
            />
          </div>

          {/* Description */}
          {workshop.description && (
            <p className="mb-4 text-main whitespace-pre-line">{workshop.description}</p>
          )}

          {/* Termin warsztatu */}
          {formattedDate && (
            <div className="mb-6">
              <h2 className="font-bold text-foreground text-xl">Termin warsztatu</h2>
              <div className="flex items-center gap-3 mt-2 text-main">
                <Calendar1 size={20} className="text-brand-primary shrink-0" />
                <span className="text-base">{formattedDate}</span>
              </div>
            </div>
          )}

          {/* Lokalizacja */}
          {workshop.location && (
            <div className="mb-6">
              <h3 className="font-bold text-foreground text-xl">Lokalizacja</h3>
              <div className="flex items-center gap-3 mt-2 mb-3 text-main">
                <MapPin size={20} className="text-brand-primary shrink-0" />
                <span className="text-base">{workshop.location}</span>
              </div>
              {workshop.locationMap?.asset && (
                <div className="relative h-28 overflow-hidden rounded-lg bg-elevated sm:h-64">
                  <SanityImage
                    image={workshop.locationMap}
                    fill
                    className="object-cover"
                    alt={`Mapa lokalizacji: ${workshop.location}`}
                  />
                </div>
              )}
            </div>
          )}

          {/* Regulamin */}
          {workshop.regulations?.asset?.url && (
            <div className="mt-6">
              <h3 className="mb-2 font-bold text-sm">Regulamin</h3>
              <a
                href={getDownloadUrl(workshop.regulations.asset.url)}
                className="inline-flex items-center gap-2 hover:bg-elevated active:bg-elevated px-3 py-2 border border-border rounded-lg font-medium text-foreground text-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                Pobierz regulamin{regulationFileType ? ` (${regulationFileType})` : ""}
              </a>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex sm:flex-row flex-col gap-3 mt-7">
            {workshop.signupFormUrl && (
              <Button asChild className="cursor-pointer">
                <a href={workshop.signupFormUrl} target="_blank" rel="noopener noreferrer">
                  <LogIn size={18} className="mr-2" />
                  Zapisz się
                </a>
              </Button>
            )}

            {workshop.materials?.asset?.url && (
              <a href={getDownloadUrl(workshop.materials.asset.url)} className="sm:flex-initial">
                <Button variant="secondary" className="cursor-pointer">
                  <Download size={18} className="mr-2" />
                  Pobierz materiały
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
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
