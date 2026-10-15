import ROUTES from "@/constants/routes";
import { getSeoMetadata } from "@/sanity/metadata/getSeoMetadata";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { legalPageBySlugQuery, legalPagesQuery } from "@/sanity/queries/legalPages";

async function getLegalPages() {
  "use cache";
  cacheLife("days");

  const data = await client.fetch<{ slug: string }[]>(
    legalPagesQuery,
    {},
    { perspective: "published", stega: false }
  );

  return data || [];
}

export async function generateStaticParams() {
  const pages = await getLegalPages();

  if (pages.length === 0) {
    return [{ slug: "not-found" }];
  }

  return pages.map((page) => ({ slug: page.slug }));
}

type LegalPageRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LegalPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return getSeoMetadata({
    pathname: ROUTES.LEGAL_PAGE(slug),
    document: { type: "legalPage", slug },
  });
}

export default async function LegalPage({ params }: LegalPageRouteProps) {
  const { slug } = await params;
  const { data: page } = await sanityFetch({ query: legalPageBySlugQuery, params: { slug } });

  if (!page) notFound();

  return (
    <>
      <Breadcrumbs segments={[{ label: page.title ?? "Strona prawna" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>{page.title ?? "Strona prawna"}</PageTitle>
          <div className="mt-6 space-y-4">
            <SanityRichText value={page.body} />
          </div>
        </div>
      </section>
    </>
  );
}
