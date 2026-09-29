"use client";

import NewsCard from "@/app/_components/Cards/NewsCard";
import type { News } from "@/sanity/typegen";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import LoadMoreButton from "@/app/_components/Buttons/LoadMoreButton";
import { usePaginatedItems } from "@/lib/hooks/usePaginatedItems";
import { NEWS_PAGE_SIZE } from "@/sanity/queries/news";
import { loadNewsPage } from "../_actions/loadNewsPage";

interface Props {
  initialNews: News[];
}

const NewsPageClient = ({ initialNews }: Props) => {
  const pagination = usePaginatedItems({
    initialItems: initialNews,
    pageSize: NEWS_PAGE_SIZE,
    loadItemsAction: loadNewsPage,
  });

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <PageTitle>Aktualności</PageTitle>
        <div className="mt-6">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {pagination.items.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
          <LoadMoreButton pagination={pagination} />
        </div>
      </div>
    </section>
  );
};

export default NewsPageClient;
