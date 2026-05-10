import RedirectButton from "@/app/_components/Buttons/RedirectButton";
import CardWithRedirect from "@/app/_components/Cards/CardWithRedirect";
import { sanityFetch } from "@/sanity/live";
import type { Img } from "@/sanity/typegen";

type CardWithRedirectItem = {
  _id: string;
  title?: string | null;
  description?: string | null;
  image?: Img | null;
  href?: string | null;
  hrefText?: string | null;
};

type CardReference = {
  _ref: string;
  _type: "reference";
};

type RedirectButtonItem = {
  _id: string;
  text?: string | null;
  href?: string | null;
};

type ButtonReference = {
  _ref: string;
  _type: "reference";
};

export default async function CardsWithRedirectSection({
  title,
  subtitle,
  cards,
  button,
}: {
  title?: string | null;
  subtitle?: string | null;
  cards?: Array<CardWithRedirectItem | CardReference> | null;
  button?: RedirectButtonItem | ButtonReference | null;
}) {
  if (!cards?.length) return null;

  const cardRefs = cards.filter((card): card is CardReference => "_ref" in card);
  const resolvedCards = cardRefs.length
    ? await resolveCards(cardRefs.map((card) => card._ref))
    : (cards as CardWithRedirectItem[]);
  const cardsToRender = resolvedCards.slice(0, 4);
  const gridClass = getGridClass(cardsToRender.length);

  const resolvedButton = button
    ? "_ref" in button
      ? await resolveButton(button._ref)
      : (button as RedirectButtonItem)
    : null;

  return (
    <section className="wire-section px-4 py-12 sm:py-16 border-b border-subtle">
      <div className="container mx-auto">
        <h2 className="mb-2 text-xl font-bold sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mb-6 text-sm text-muted">{subtitle}</p> : null}

        <div className={`grid gap-4 ${gridClass}`}>
          {cardsToRender.map((card, index) => (
            <CardWithRedirect
              key={`${card._id ?? card.title ?? "card"}-${index}`}
              title={card.title}
              description={card.description}
              image={card.image}
              href={card.href}
              hrefText={card.hrefText}
            />
          ))}
        </div>

        {resolvedButton?.href && resolvedButton.text ? (
          <div className="mt-6 w-full flex justify-center">
            <RedirectButton href={resolvedButton.href} text={resolvedButton.text} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

async function resolveCards(ids: string[]) {
  const query = `*[_type == "cardWithRedirect" && _id in $ids]{
    _id,
    title,
    description,
    image,
    href,
    hrefText
  }`;

  const { data } = await sanityFetch({ query, params: { ids } });
  const cards = (data ?? []) as CardWithRedirectItem[];
  const byId = new Map(cards.map((card) => [card._id, card] as const));

  return ids
    .map((id) => byId.get(id))
    .filter((card): card is CardWithRedirectItem => Boolean(card));
}

async function resolveButton(id: string) {
  const query = `*[_type == "redirectButton" && _id == $id][0]{
    _id,
    text,
    href
  }`;

  const { data } = await sanityFetch({ query, params: { id } });
  return (data ?? null) as RedirectButtonItem | null;
}

function getGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
}
