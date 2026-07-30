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
        <div className="mb-1 rounded-full ring-1 ring-primary-foreground/30 w-20 h-20 overflow-hidden">
          <SanityImage
            image={photo}
            alt={photoAlt ?? name}
            width={80}
            height={80}
            className="w-20 h-20 object-cover"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-primary-foreground/10 mb-1 border border-primary-foreground/50 border-dashed rounded-full w-20 h-20 font-semibold text-[10px] text-primary-foreground/90 uppercase tracking-wide">
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
