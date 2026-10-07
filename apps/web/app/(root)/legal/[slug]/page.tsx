import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import { sanityFetch } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { legalPageBySlugQuery } from "@/sanity/queries/legalPages";

type LegalPageRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LegalPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: legalPageBySlugQuery, params: { slug } });

  return mapMetadata(data);
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
