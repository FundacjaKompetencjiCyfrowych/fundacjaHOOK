import NewsCard from "@/app/_components/Cards/NewsCard";
import { sanityFetch } from "@/sanity/live";
import { newsQuery } from "@/sanity/queries/news";

const NewsPage = async () => {
  const { data: news } = await sanityFetch({
    query: newsQuery,
  });

  return <NewsCard news={news[0]} />;
};

export default NewsPage;
