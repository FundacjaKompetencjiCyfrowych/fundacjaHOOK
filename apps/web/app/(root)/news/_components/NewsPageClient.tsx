"use client";

import { useState } from "react";
import NewsCard from "@/app/_components/Cards/NewsCard";
import { News } from "@/sanity/typegen";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { Button } from "@/app/_components/ui/button";
import { NEWS_PAGE_SIZE } from "@/sanity/queries/news";
import { loadMoreNews } from "../_actions/loadMoreNews";

interface Props {
  initialNews: News[];
}

const NewsPageClient = ({ initialNews }: Props) => {
  const [news, setNews] = useState(initialNews);
  const [hasMore, setHasMore] = useState(initialNews.length === NEWS_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    setLoadError(false);

    try {
      const nextNews = await loadMoreNews(news.length);
      setNews((currentNews) => [...currentNews, ...nextNews]);
      setHasMore(nextNews.length === NEWS_PAGE_SIZE);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <PageTitle>Aktualności</PageTitle>
        <div className="mt-6">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore} disabled={isLoading} className="cursor-pointer">
                {isLoading ? "Ładowanie..." : "Załaduj więcej"}
              </Button>
            </div>
          )}
          {loadError && (
            <p role="alert" className="mt-4 text-center">
              Nie udało się załadować kolejnych aktualności. Spróbuj ponownie.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsPageClient;
