import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";

type TeamMemberCardProps = {
  name: string;
  role: string;
  photo?: Img | null;
  photoAlt?: string;
  className?: string;
};

export default function TeamMemberCard({
  name,
  role,
  photo,
  photoAlt,
  className,
}: TeamMemberCardProps) {
  return (
    <Card
      className={cn(
        "items-center bg-[#0635d0] shadow-md px-4 py-5 border border-border text-primary-foreground text-center",
        className
      )}
    >
      {photo ? (
        <div className="mb-1 rounded-full w-24 h-24 overflow-hidden">
          <SanityImage
            image={photo}
            alt={photoAlt ?? name}
            width={96}
            height={96}
            className="w-24 h-24 object-cover"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-primary-foreground/10 mb-1 rounded-full w-24 h-24 font-semibold text-[10px] text-primary-foreground/90 uppercase tracking-wide">
          photo
        </div>
      )}

      <CardHeader className="p-0">
        <CardTitle className="font-bold text-primary-foreground text-sm">{name}</CardTitle>
        <CardDescription className="text-primary-foreground/80 text-xs">{role}</CardDescription>
      </CardHeader>
    </Card>
  );
}
