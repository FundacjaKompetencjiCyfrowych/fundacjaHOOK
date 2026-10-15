import type { Metadata } from "next";
import ROUTES from "@/constants/routes";
import { getSeoMetadata } from "@/sanity/metadata/getSeoMetadata";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { HomeSections } from "./_home/_components/HomeSections";

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

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata({ pathname: ROUTES.HOME, document: { type: "home" } });
}

export default async function Home() {
  const { data } = await sanityFetch({ query: homeQuery });
  return data ? <HomeSections data={data} /> : null;
}
