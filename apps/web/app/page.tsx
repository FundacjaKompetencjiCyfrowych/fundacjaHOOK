import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { notFound } from "next/navigation";

const homeQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    sections[]{
      ...,
      _type in ["cardswithbackground", "sectionCardsWithBackground"] => {
        ...,
        cards[]->{
          _id,
          title,
          description,
          image
        }
      },
      _type in ["cardswithredirect", "sectionCardsWithRedirect"] => {
        ...,
        cards[]->{
          _id,
          title,
          description,
          href,
          hrefText,
          image
        },
        button->{
          _id,
          text,
          href
        }
      },
      _type in ["supportSection", "sectionSupport"] => {
        ...,
        button->{
          _id,
          text,
          href
        }
      },
      _type in ["cooperationSection", "sectionCooperation"] => {
        ...,
        button->{
          _id,
          text,
          href
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
