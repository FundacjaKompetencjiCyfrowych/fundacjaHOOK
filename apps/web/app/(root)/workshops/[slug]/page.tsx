import { SanityImage } from "@/sanity/image/SanityImage";
import { workshopDetailsQuery } from "@/sanity/queries/workshopDetails";
import { sanityFetch } from "@/sanity/live";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { Calendar1, MapPin, Timer, Users, Download, LogIn } from "lucide-react";
import { translateGroup } from "@/lib/mappers/workshop";
import { getFormattedWorkshopDate, getHoursLabel, translateStatus } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

interface WorkshopPageProps {
  params: Promise<{ slug: string }>;
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
      <div className="bg-gray-50 px-4 sm:px-8 py-4 w-full">
        <Link href="/workshops" className="font-medium text-teal-600 hover:text-teal-700 text-sm">
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
                {translateStatus(workshop.status)}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {workshop.description && (
          <p className="mb-8 text-gray-700 text-base leading-relaxed">{workshop.description}</p>
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

        {/* Workshop details sections */}
        <div className="space-y-6 mb-10">
          {/* Termin warsztatu */}
          {formattedDate && (
            <div className="pb-6 border-gray-200 border-b">
              <h3 className="mb-4 font-bold text-lg">Termin warsztatu</h3>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar1 size={20} className="text-teal-600 shrink-0" />
                <span className="text-base">{formattedDate}</span>
              </div>
            </div>
          )}

          {workshop.materials?.asset?.url && (
            <div className="pb-6 border-gray-200 border-b">
              <h3 className="mb-4 font-bold text-lg">Regulamin</h3>
              <a
                href={workshop.materials.asset.url}
                download={workshop.materials.asset.originalFilename || "materials"}
                className="inline-flex items-center gap-2 font-medium text-teal-600 hover:text-teal-700"
              >
                <Download size={18} />
                Pobierz regulamin (PDF)
              </a>
            </div>
          )}
        </div>

        {/* Lokalizacja */}
        {workshop.location && (
          <div className="pb-6 border-gray-200 border-b">
            <h3 className="mb-4 font-bold text-lg">Lokalizacja</h3>
            <div className="flex items-center gap-3 mb-4 text-gray-700">
              <MapPin size={20} className="text-teal-600 shrink-0" />
              <span className="text-base">{workshop.location}</span>
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-lg h-48 text-gray-400">
              [MAP / LOCATION PLACEHOLDER]
            </div>
          </div>
        )}

        {/* Workshop info grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 pb-6 border-gray-200 border-b">
          {workshop.duration && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Timer size={18} className="text-teal-600" />
                <span className="font-semibold text-sm">Czas trwania</span>
              </div>
              <p className="text-gray-700">
                {workshop.duration} {getHoursLabel(Number(workshop.duration))}
              </p>
            </div>
          )}

          {workshop.group && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-teal-600" />
                <span className="font-semibold text-sm">Grupa docelowa</span>
              </div>
              <p className="text-gray-700">{translateGroup(workshop.group)}</p>
            </div>
          )}
        </div>

        {/* Materials download section */}

        {/* Action buttons */}
        <div className="flex sm:flex-row flex-col gap-3">
          {workshop.signupFormUrl && (
            <a
              href={workshop.signupFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="bg-teal-600 hover:bg-teal-700 w-full text-white">
                <LogIn size={18} className="mr-2" />
                Zapisz się
              </Button>
            </a>
          )}

          {workshop.materials?.asset?.url && (
            <a
              href={workshop.materials.asset.url}
              download={workshop.materials.asset.originalFilename || "materials"}
              className="sm:flex-initial flex-1"
            >
              <Button
                variant="outline"
                className="hover:bg-teal-50 border-teal-600 w-full text-teal-600"
              >
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
  const { slug } = await params;

  return (
    <Suspense
      fallback={<div className="flex justify-center items-center min-h-screen">Ładowanie...</div>}
    >
      <WorkshopContent slug={slug} />
    </Suspense>
  );
}
