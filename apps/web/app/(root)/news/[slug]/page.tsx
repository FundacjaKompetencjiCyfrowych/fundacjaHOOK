import { allNewsQuery, newsBySlugQuery } from "@/sanity/queries/news";
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
import { formatDate } from "@/lib/formatDate";
import { Calendar1 } from "lucide-react";

async function getNews() {
  "use cache";
  cacheLife("days");

  const data = await client.fetch(allNewsQuery, {}, { perspective: "published", stega: false });

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
          <time
            dateTime={item._createdAt}
            className="mt-2 mb-2 flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Calendar1 size={14} />
            {formatDate(item._createdAt)}
          </time>
          <Link
            href={ROUTES.NEWS}
            className="block mt-6 mb-6 font-medium text-brand-primary hover:text-brand-onhover text-sm"
          >
            ← Wróć do listy
          </Link>

          <div className="relative mb-6 h-64 rounded-lg overflow-hidden">
            <SanityImage
              image={item.image}
              width={1200}
              height={480}
              fill
              className="object-cover"
            />
          </div>

          {item.description && (
            <p className="mb-4 text-base leading-[1.1] tracking-[-0.01em] text-muted">
              {item.description}
            </p>
          )}

          <div
            className="text-main whitespace-pre-line [&_p]:mb-6 [&_p]:leading-normal
              [&_p]:tracking-normal [&_p]:text-main"
          >
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
