import RedirectButton from "@/app/_components/Buttons/RedirectButton";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";
import { Typography } from "../../ui/typography";

type ButtonData = {
  _id?: string;
  text?: string | null;
  href?: string | null;
};

export default function SupportSection({
  title,
  description,
  krsNumber,
  backgroundImage,
  button,
}: {
  title?: string | null;
  description?: string | null;
  krsNumber?: string | null;
  backgroundImage?: Img | null;
  button?: ButtonData | null;
}) {
  return (
    <section className="wire-section px-4 py-8 sm:px-6 sm:py-10 border-b border-subtle">
      <div className="container mx-auto relative overflow-hidden rounded-4xl px-6 py-30 text-center text-white sm:px-8">
        <div className="absolute inset-0 " />
        {backgroundImage ? (
          <div
            className="absolute top-0 left-0 w-[220%] h-full -translate-x-[36%]
              md:w-[110%] md:h-auto md:translate-x-0 md:-translate-y-[10%]"
          >
            <SanityImage
              image={backgroundImage}
              width={1920}
              className="h-full w-full object-cover object-top md:h-auto"
              style={{
                width: "100%",
                maxWidth: "none",
              }}
            />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-radial from-[#a87375]/90 from-25% to-transparent to-60%" />
        <div className="absolute inset-0 bg-[#eaacae]/60" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 w-[95%] ">
            <Typography variant="h3" weight="bold" className="text-white">
              {title}
            </Typography>
            {description ? (
              <Typography variant="body" weight="medium" className="text-white md:text-justify">
                {description}
              </Typography>
            ) : null}
            {krsNumber ? (
              <Typography variant="body" weight="bold" className=" text-white">
                KRS: [{krsNumber}]
              </Typography>
            ) : null}
          </div>

          {button?.href && button.text ? (
            <RedirectButton
              href={button.href}
              text={button.text}
              className="rounded-xl py-3 px-4"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
