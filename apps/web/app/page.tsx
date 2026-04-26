import { q } from "@/sanity/groqd";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { notFound } from "next/navigation";
import UtilityHeader from "@/app/_components/UtilityHeader";

export default async function Home() {
  const home = q.star.filterByType("home").slice(0);

  const { data } = await sanityFetch({ query: home.query });
  if (!data || data.length === 0) notFound();
  const h = data[0];

  return <UtilityHeader />;
}
