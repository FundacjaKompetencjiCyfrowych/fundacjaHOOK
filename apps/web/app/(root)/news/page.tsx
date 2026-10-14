import type { Metadata } from "next";
import ROUTES from "@/constants/routes";
import { getSeoMetadata } from "@/sanity/metadata/getSeoMetadata";
import { sanityFetch } from "@/sanity/live";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import { NEWS_PAGE_SIZE, newsQuery } from "@/sanity/queries/news";
import NewsPageClient from "./_components/NewsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata({ pathname: ROUTES.NEWS });
}

const NewsPage = async () => {
  const { data: news } = await sanityFetch({
    query: newsQuery,
    params: { start: 0, end: NEWS_PAGE_SIZE },
  });

  return (
    <>
      <Breadcrumbs segments={[{ label: "Aktualności" }]} />
      <NewsPageClient initialNews={news} />
    </>
  );
};

export default NewsPage;
