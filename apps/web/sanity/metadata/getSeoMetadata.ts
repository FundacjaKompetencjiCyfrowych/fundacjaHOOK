import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/live";
import { seoMetadataQuery } from "@/sanity/queries/seo";
import { mapMetadata } from "./mapMetadata";

type SeoDocument =
  | { type: "home" | "aboutUs" | "contact" | "supportUs" }
  | { type: "news" | "project" | "workshop" | "legalPage"; slug: string };

interface SeoMetadataOptions {
  pathname?: string;
  document?: SeoDocument;
}

/** Use without a pathname only for the root layout's default metadata. */
export async function getSeoMetadata({
  pathname,
  document,
}: SeoMetadataOptions = {}): Promise<Metadata> {
  const slug = document && "slug" in document ? document.slug : null;
  const { data } = await sanityFetch({
    query: seoMetadataQuery,
    params: { type: document?.type ?? null, slug },
    stega: false,
  });

  if (slug !== null && !data?.page) notFound();

  return mapMetadata({
    seo: data?.page?.seo,
    defaults: data?.defaults,
    pathname,
    origin: process.env.NEXT_PUBLIC_ORIGIN,
  });
}
