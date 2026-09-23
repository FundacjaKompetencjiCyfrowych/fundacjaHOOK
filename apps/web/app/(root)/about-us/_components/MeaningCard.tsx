import { SanityImage } from "@/sanity/image/SanityImage";

import type { TextImageCard } from "../types";

export default function MeaningCard({ card }: { card: TextImageCard }) {
  return (
    <article>
      {card.image && (
        <SanityImage image={card.image} width={83} height={48} className="w-auto h-12" />
      )}
      <h3 className="mt-5 font-semibold text-brand-primary text-base leading-6">{card.title}</h3>
      <p className="mt-2 text-muted text-sm leading-[22px]">{card.description}</p>
    </article>
  );
}
