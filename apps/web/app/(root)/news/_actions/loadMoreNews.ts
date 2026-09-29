"use server";

import { sanityFetch } from "@/sanity/live";
import { NEWS_PAGE_SIZE, newsQuery } from "@/sanity/queries/news";
import { News } from "@/sanity/typegen";

export async function loadMoreNews(start: number): Promise<News[]> {
  const { data } = await sanityFetch({
    query: newsQuery,
    params: { start, end: start + NEWS_PAGE_SIZE },
  });

  return data;
}
