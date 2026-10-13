import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { HomeSections } from "./_components/Sections/Home/HomeSections";

const homeQuery = defineQuery(`
  *[_type == "home" && _id == "home"][0]{
    _id,
    hero,
    aboutUs,
    workshops { ..., "documents": items[]-> },
    supportUs,
    projects { ..., "documents": items[]-> },
    contact,
    "krs": *[_id == "organizationDetails"][0].krs
  }
`);

export default async function Home() {
  const { data } = await sanityFetch({ query: homeQuery });
  return data ? <HomeSections data={data} /> : null;
}
