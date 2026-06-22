import { Workshop } from "@/sanity/typegen";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import { Badge } from "../ui/badge";
import { Calendar1, MapPin, Timer, Users } from "lucide-react";
import { mapGroup } from "@/lib/mappers/workshop";
import { getFormattedWorkshopDate, getHoursLabel } from "@/lib/utils";
import { mapStatus } from "@/lib/utils";

interface Props {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: Props) => {
  const formattedDate = getFormattedWorkshopDate(workshop.datetime);

  return (
    <a href={`/workshops/${workshop.slug?.current || "not-found"}`}>
      <Card className="relative gap-2 shadow-md hover:shadow-lg mx-auto pt-0 w-full max-w-142 transition-shadow cursor-pointer">
        <div className="px-4 pt-4">
          <SanityImage
            image={workshop.image}
            width={536}
            height={128}
            className="rounded-xl w-full h-32 object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center mb-1">
            <span className="mr-2 font-bold">{workshop.title}</span>
            <Badge
              variant={workshop.status === "inProgress" ? "default" : "outline"}
              className="font-normal text-[10px]"
            >
              {mapStatus(workshop.status)}
            </Badge>
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
    </a>
  );
};

export default WorkshopCard;
