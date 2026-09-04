import { SanityImage } from "@/sanity/image/SanityImage";
import { Typography } from "../../ui/typography";

export default function Hero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: { [key: string]: any };
}) {
  return (
    <section className="py-8 px-12 border-b border-subtle">
      <div className="container mx-auto">
        <div className="relative h-64 sm:h-96 mt-4 mb-6 rounded-xl border border-dashed border-subtle bg-placeholder flex items-center justify-center overflow-hidden">
          <SanityImage image={image} fill className="object-cover" />
        </div>
        <Typography variant={"h3"} weight={"bold"} className="mb-3">
          {title}
        </Typography>
        <Typography variant={"body"} className="text-gray-700">
          {subtitle}
        </Typography>
      </div>
    </section>
  );
}
