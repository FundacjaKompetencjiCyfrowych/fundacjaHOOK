import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { notFound } from "next/navigation";

const homeQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    sections[]{
      ...,
      _type == "cardsLandingSection" => {
        ...,
        cards[]->{
          _id,
          title,
          description,
          image
        }
      }
    }
  }
`);

export default async function Home() {
  const { data } = await sanityFetch({ query: homeQuery });
  if (!data) notFound();

  return <SanitySections value={data.sections} />;
}
