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
    <main className="min-h-screen w-full">
      {/* Header with back link */}
      <div className="w-full bg-gray-50 py-4 px-4 sm:px-8">
        <Link href="/workshops" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          ← Wróć do listy
        </Link>
      </div>

      {/* Main content */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-12">
        {/* Title with Badge */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold">{workshop.title}</h1>
            {workshop.status && (
              <Badge
                variant={workshop.status === "inProgress" ? "default" : "outline"}
                className="font-normal text-xs mt-2 whitespace-nowrap"
              >
                {translateStatus(workshop.status)}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        {workshop.description && (
          <p className="text-gray-700 text-base leading-relaxed mb-8">{workshop.description}</p>
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
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-4">Termin warsztatu</h3>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar1 size={20} className="text-teal-600 shrink-0" />
                <span className="text-base">{formattedDate}</span>
              </div>
            </div>
          )}

          {/* Lokalizacja */}
          {workshop.location && (
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-4">Lokalizacja</h3>
              <div className="flex items-center gap-3 text-gray-700 mb-4">
                <MapPin size={20} className="text-teal-600 shrink-0" />
                <span className="text-base">{workshop.location}</span>
              </div>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-gray-400">
                [MAP / LOCATION PLACEHOLDER]
              </div>
            </div>
          )}

          {/* Workshop info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
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
          {workshop.materials?.asset?.url && (
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-4">Regulamin</h3>
              <a
                href={workshop.materials.asset.url}
                download={workshop.materials.asset.originalFilename || "materials"}
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                <Download size={18} />
                Pobierz regulamin (PDF)
              </a>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {workshop.signupFormUrl && (
            <a
              href={workshop.signupFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                <LogIn size={18} className="mr-2" />
                Zapisz się
              </Button>
            </a>
          )}

          {workshop.materials?.asset?.url && (
            <a
              href={workshop.materials.asset.url}
              download={workshop.materials.asset.originalFilename || "materials"}
              className="flex-1 sm:flex-initial"
            >
              <Button
                variant="outline"
                className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
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
      fallback={<div className="min-h-screen flex items-center justify-center">Ładowanie...</div>}
    >
      <WorkshopContent slug={slug} />
    </Suspense>
  );
}
