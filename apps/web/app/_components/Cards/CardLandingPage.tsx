import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";
import { Typography } from "../ui/typography";

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
    <div className="p-4 rounded-xl  bg-elevated shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="p-2 mb-3 h-12 w-12 overflow-hidden rounded-xl border border-subtle bg-[#eae7e1] flex items-center justify-center">
        <SanityImage image={image} width={30} height={30} className="object-cover " />
      </div>
      <Typography variant="body" weight="medium" className="mb-1 ">
        {title}
      </Typography>
      <Typography variant={"caption"} className=" text-muted">
        {description}
      </Typography>
    </div>
  );
}
