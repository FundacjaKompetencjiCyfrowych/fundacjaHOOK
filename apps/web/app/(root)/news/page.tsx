import { sanityFetch } from "@/sanity/live";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import { newsQuery } from "@/sanity/queries/news";
import NewsPageClient from "./page.client";

const NewsPage = async () => {
  const { data: news } = await sanityFetch({
    query: newsQuery,
  });

  return (
    <>
      <Breadcrumbs segments={[{ label: "Aktualności" }]} />
      <NewsPageClient initialNews={news} />
    </>
  );
};

export default NewsPage;
