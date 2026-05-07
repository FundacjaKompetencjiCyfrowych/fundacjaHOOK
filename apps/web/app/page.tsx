import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { notFound } from "next/navigation";
import CardWithRedirect from "./_components/Cards/CardWithRedirect";
import CardLandingPage from "./_components/Cards/CardLandingPage";

export default async function Home() {
  const home = q.star.filterByType("home").slice(0);

  const { data } = await sanityFetch({ query: home.query });
  if (!data || data.length === 0) notFound();
  const h = data[0];

  return (
    <>
      <CardLandingPage
        title="Warsztat 1"
        image="/path/to/image.jpg"
        description="[TEXT BLOCK] Krótki opis warsztatu..."
      />
      <CardWithRedirect
        title="Warsztat 1"
        image="/path/to/image.jpg"
        description="[TEXT BLOCK] Krótki opis warsztatu..."
        href="/warsztat-1"
        hrefText="Zobacz Warsztaty"
      />
    </>
  );
}
