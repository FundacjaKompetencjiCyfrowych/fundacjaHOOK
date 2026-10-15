import type { Workshop } from "@/sanity/typegen";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import { StatusBadge } from "@/app/_components/ui/status-badge";
import { Calendar1, MapPin, Timer, Users } from "lucide-react";
import { getFormattedWorkshopDate, getHoursLabel, mapGroup } from "./workshop.helpers";

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const { title, image, status, location } = workshop;
  const href = workshop.slug?.current ? `/workshops/${workshop.slug.current}` : undefined;
  const date = getFormattedWorkshopDate(workshop.datetime);
  const duration = workshop.duration
    ? `${workshop.duration} ${getHoursLabel(workshop.duration)}`
    : undefined;
  const group = workshop.group ? mapGroup(workshop.group) : undefined;
  const card = (
    <Card className="relative gap-2 shadow-md hover:shadow-lg pt-0 w-full transition-all hover:-translate-y-0.5 duration-150 cursor-pointer">
      {image?.asset ? (
        <div className="relative mx-4 mt-4 aspect-[2.1] min-w-0 overflow-hidden rounded-xl">
          <SanityImage image={image} fill className="object-cover" />
        </div>
      ) : null}
      <CardHeader>
        <CardTitle className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm leading-[1.15] mb-1">
          <span>{title}</span>
          <StatusBadge status={status} />
        </CardTitle>

        <CardDescription>
          <CardDescription className="space-y-1">
            {date && (
              <div className="flex items-center gap-1">
                <Calendar1 size={18} /> {date}
              </div>
            )}

            {location && (
              <div className="flex items-center gap-1">
                <MapPin size={18} /> {location}
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-1">
                <Timer size={18} /> {duration}
              </div>
            )}

            {group && (
              <div className="flex items-center gap-1">
                <Users size={18} /> {group}
              </div>
            )}
          </CardDescription>
        </CardDescription>
      </CardHeader>
    </Card>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}
