import { sanityFetch } from "@/sanity/live";
import { newsQuery } from "@/sanity/queries/news";
import NewsPageClient from "./page.client";

const NewsPage = async () => {
  const { data: news } = await sanityFetch({
    query: newsQuery,
  });

  return <NewsPageClient initialNews={news} />;
};

export default NewsPage;
