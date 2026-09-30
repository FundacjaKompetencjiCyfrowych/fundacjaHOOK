import { Workshop } from "@/sanity/typegen";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import { StatusBadge } from "../ui/status-badge";
import { Calendar1, MapPin, Timer, Users } from "lucide-react";
import { mapGroup } from "@/lib/mappers/workshop";
import { getFormattedWorkshopDate, getHoursLabel } from "@/lib/utils";

interface Props {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: Props) => {
  const formattedDate = getFormattedWorkshopDate(workshop.datetime);

  return (
    <Link href={`/workshops/${workshop.slug?.current || "not-found"}`}>
      <Card className="relative gap-2 shadow-md hover:shadow-lg pt-0 w-full transition-all hover:-translate-y-0.5 duration-150 cursor-pointer">
        <div className="relative mx-4 mt-4 aspect-[2.1] min-w-0 overflow-hidden rounded-xl">
          <SanityImage image={workshop.image} fill className="object-cover" />
        </div>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm leading-[1.15] mb-1">
            <span>{workshop.title}</span>
            <StatusBadge status={workshop.status} />
          </CardTitle>

          <CardDescription>
            <CardDescription className="space-y-1">
              {formattedDate && (
                <div className="flex items-center gap-1">
                  <Calendar1 size={18} /> {formattedDate}
                </div>
              )}

              {workshop.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={18} /> {workshop.location}
                </div>
              )}

              {workshop.duration && (
                <div className="flex items-center gap-1">
                  <Timer size={18} /> {workshop.duration} {getHoursLabel(Number(workshop.duration))}
                </div>
              )}

              {workshop.group && (
                <div className="flex items-center gap-1">
                  <Users size={18} /> {mapGroup(workshop.group)}
                </div>
              )}
            </CardDescription>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default WorkshopCard;
