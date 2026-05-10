import CardLandingPage from "@/app/_components/Cards/CardLandingPage";
import { sanityFetch } from "@/sanity/live";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Img } from "@/sanity/typegen";

type CardsLandingItem = {
  _id: string;
  title?: string | null;
  description?: string | null;
  image?: Img | null;
};

type CardsLandingReference = {
  _ref: string;
  _type: "reference";
};

type CardsLandingInput = CardsLandingItem | CardsLandingReference;

export default async function CardsLandingSection({
  title,
  subtitle,
  backgroundImage,
  cards,
}: {
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: Img | null;
  cards?: CardsLandingInput[] | null;
}) {
  if (!cards?.length) return null;

  const cardRefs = cards.filter((card): card is CardsLandingReference => "_ref" in card);
  const resolvedCards = cardRefs.length
    ? await resolveCards(cardRefs.map((card) => card._ref))
    : (cards as CardsLandingItem[]);

  return (
    <section className="wire-section relative overflow-hidden px-4 py-12 sm:py-16 border-b border-subtle">
      <div className="pointer-events-none absolute inset-0">
        <SanityImage image={backgroundImage} fill className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-page/80" />

      <div className="container mx-auto relative z-10">
        <h2 className="mb-6 text-xl font-bold sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mb-6 text-sm text-muted">{subtitle}</p> : null}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {resolvedCards.map((card, index) => (
            <CardLandingPage
              key={`${card._id ?? card.title ?? "card"}-${index}`}
              title={card.title}
              image={card.image}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

async function resolveCards(ids: string[]) {
  const query = `*[_type == "cardLandingPage" && _id in $ids]{
    _id,
    title,
    description,
    image
  }`;

  const { data } = await sanityFetch({ query, params: { ids } });
  const cards = (data ?? []) as CardsLandingItem[];
  const byId = new Map(cards.map((card) => [card._id, card] as const));

  return ids.map((id) => byId.get(id)).filter((card): card is CardsLandingItem => Boolean(card));
}
