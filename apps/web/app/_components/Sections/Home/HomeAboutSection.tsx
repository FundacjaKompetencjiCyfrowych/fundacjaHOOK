import { Card } from "../../ui/card";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";
import { Typography } from "../../ui/typography";

type CardsLandingItem = {
  _key?: string;
  title?: string | null;
  description?: string | null;
  image?: Img | null;
};

export default function HomeAboutSection({
  title,
  subtitle,
  backgroundImage,
  cards,
}: {
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: Img | null;
  cards?: CardsLandingItem[] | null;
}) {
  if (!cards?.length) return null;

  return (
    <section className="wire-section relative overflow-hidden border-y border-subtle px-4 py-12 sm:px-6 lg:pb-12 lg:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0
      w-[270%] h-[200%] -translate-x-[25%] -translate-y-[-5%]
      md:w-[112%] md:h-auto md:-translate-x-[12%] md:-translate-y-[4.5%]"
      >
        <SanityImage
          image={backgroundImage}
          width={1920}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "none",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-page/30" />

      <div className="relative z-10 mx-auto max-w-[1152px]">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="mb-6 text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          {title}
        </Typography>
        {subtitle ? <p className="mb-6 text-sm text-muted">{subtitle}</p> : null}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Card
              key={card._key ?? index}
              className="gap-0 rounded-xl bg-gray-200 p-4 shadow-md ring-0 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg lg:min-h-[166px]"
            >
              <div className="p-2 mb-3 h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-subtle bg-[#eae7e1] flex items-center justify-center">
                <SanityImage
                  image={card.image}
                  width={1920}
                  className="object-contain "
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
              <Typography variant="body" weight="medium" className="mb-1 ">
                {card.title}
              </Typography>
              <Typography variant={"caption"} className="text-muted tracking-[0.02em]">
                {card.description}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
