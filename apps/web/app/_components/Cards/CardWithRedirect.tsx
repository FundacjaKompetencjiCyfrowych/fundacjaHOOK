import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";
import Link from "next/link";

export default function CardWithRedirect({
  title,
  image,
  description,
  href,
  hrefText,
}: {
  title?: string | null;
  image?: Img | null;
  description?: string | null;
  href?: string | null;
  hrefText?: string | null;
}) {
  return (
    <div className="p-4 rounded-xl overflow-hidden transition-all duration-200 shadow-md bg-elevated hover:-translate-y-0.5">
      <div className="mb-3 h-32 overflow-hidden rounded-md border border-subtle bg-page">
        <SanityImage
          image={image}
          width={536}
          height={128}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted mb-3">{description}</p>
      {href ? (
        <Link href={href} className="text-primary text-xs font-semibold hover:underline">
          {hrefText ?? "Czytaj wiecej"} &gt;
        </Link>
      ) : null}
    </div>
  );
}
