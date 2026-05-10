import RedirectButton from "@/app/_components/Buttons/RedirectButton";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";

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
      <div className="container mx-auto relative overflow-hidden rounded-2xl px-6 py-16 text-center text-white sm:px-8">
        <div className="absolute inset-0 bg-[#8f8f8f]" />
        {backgroundImage ? (
          <SanityImage image={backgroundImage} fill className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {description ? <p className="text-sm opacity-90 sm:text-base">{description}</p> : null}
          {krsNumber ? <p className="text-sm opacity-80">KRS: [{krsNumber}]</p> : null}
          {button?.href && button.text ? (
            <RedirectButton href={button.href} text={button.text} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
