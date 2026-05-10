import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";

export default function CardLandingPage({
  title,
  description,
  image,
}: {
  title?: string | null;
  description?: string | null;
  image?: Img | null;
}) {
  return (
    <div className="p-4 rounded-xl border border-subtle bg-elevated shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="mb-3 h-12 w-12 overflow-hidden rounded-md border border-subtle bg-page">
        <SanityImage image={image} width={48} height={48} className="h-full w-full object-cover" />
      </div>
      <h3 className="mb-1 text-sm font-bold">{title}</h3>
      <p className="text-xs text-muted">{description}</p>
    </div>
  );
}
