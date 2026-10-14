import type { Metadata } from "next";

export interface SeoMetadata {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  ogImage?: { asset?: { url?: string | null } | null } | null;
  twitterCreator?: string | null;
  robots?: { noIndex?: boolean | null; noFollow?: boolean | null } | null;
}

interface MapMetadataOptions {
  seo?: SeoMetadata | null;
  defaults?: SeoMetadata | null;
  /** Omit in the root layout to avoid inheriting a shared canonical URL. */
  pathname?: string;
  origin?: string;
}

const nonEmpty = (value?: string | null): string | undefined => value?.trim() || undefined;

/** Merge individual SEO fields before mapping to Next.js metadata. */
export const mapMetadata = (options?: MapMetadataOptions | null): Metadata => {
  if (!options) return {};

  const { seo, defaults, pathname, origin } = options;
  const title = nonEmpty(seo?.title) ?? nonEmpty(defaults?.title);
  const description = nonEmpty(seo?.description) ?? nonEmpty(defaults?.description);
  const image = nonEmpty(seo?.ogImage?.asset?.url) ?? nonEmpty(defaults?.ogImage?.asset?.url);
  const creator = nonEmpty(seo?.twitterCreator) ?? nonEmpty(defaults?.twitterCreator);
  let canonical: string | undefined;

  if (pathname !== undefined) {
    const pageUrl = new URL(pathname, origin);
    pageUrl.search = "";
    pageUrl.hash = "";
    canonical =
      nonEmpty(seo?.canonical) ??
      (pageUrl.pathname === "/" ? nonEmpty(defaults?.canonical) : undefined) ??
      pageUrl.href;
  }

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
      ...(creator ? { creator } : {}),
    },
    robots: {
      index: !(seo?.robots?.noIndex ?? defaults?.robots?.noIndex ?? false),
      follow: !(seo?.robots?.noFollow ?? defaults?.robots?.noFollow ?? false),
    },
  };
};
