import { SanityImage } from "@/sanity/image/SanityImage";
import { Typography } from "../../ui/typography";
import type { Img } from "@/sanity/typegen";

export default function HomeHeroSection({
  title,
  subtitle,
  image,
}: {
  title?: string | null;
  subtitle?: string | null;
  image?: Img | null;
}) {
  return (
    <section className="py-8 px-12 border-b border-subtle">
      <div className="mx-auto max-w-[1152px]">
        {image?.asset ? (
          <div className="relative h-64 sm:h-[387px] mt-4 mb-6 rounded-xl overflow-hidden">
            <SanityImage image={image} fill className="object-cover object-center" />
          </div>
        ) : null}
        <Typography variant={"h3"} weight={"bold"} className="mb-3 sm:max-w-[50%] wrap-break-word">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant={"body"} className="text-gray-700 sm:max-w-[50%] wrap-break-word">
            {subtitle}
          </Typography>
        ) : null}
      </div>
    </section>
  );
}
