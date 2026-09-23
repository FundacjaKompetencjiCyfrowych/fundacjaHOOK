import { newsBySlugQuery } from "@/sanity/queries/news";
import { newsQuery } from "@/sanity/queries/news";
import { client } from "@/sanity/client";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { sanityFetch } from "@/sanity/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SanityImage } from "@/sanity/image/SanityImage";
import { SanityRichText } from "@/sanity/richText/SanityRichText";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import ROUTES from "@/constants/routes";

async function getNews() {
  "use cache";
  cacheLife("days");

  const data = await client.fetch(newsQuery, {}, { perspective: "published", stega: false });

  return data || [];
}

export async function generateStaticParams() {
  const news = await getNews();

  if (!news || news.length === 0) {
    return [{ slug: "not-found" }];
  }

  return news
    .filter(
      (item): item is (typeof news)[number] & { slug: { current: string } } =>
        item.slug !== null && item.slug !== undefined && item.slug.current !== undefined
    )
    .map((item) => ({ slug: item.slug.current }));
}

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function NewsArticlePageContent({ params }: NewsArticlePageProps) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: newsBySlugQuery,
    params: { slug },
  });

  if (!data) notFound();

  const item = data;
  const title = item.title ?? "Aktualność";

  return (
    <>
      <Breadcrumbs segments={[{ label: "Aktualności", href: ROUTES.NEWS }, { label: title }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>{title}</PageTitle>
          <Link
            href={ROUTES.NEWS}
            className="block mt-6 font-medium text-brand-primary hover:text-brand-onhover text-sm"
          >
            ← Wróć do listy
          </Link>

          <div className="mb-6 rounded-lg overflow-hidden">
            <SanityImage
              image={item.image}
              width={1200}
              height={480}
              className="w-full h-64 object-cover"
            />
          </div>

          {item.description && <p className="mb-4 text-muted">{item.description}</p>}

          <div className="text-main">
            <SanityRichText value={item.article} />
          </div>
        </div>
      </section>
    </>
  );
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  return <NewsArticlePageContent params={params} />;
}
