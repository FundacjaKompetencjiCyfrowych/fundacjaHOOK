"use server";

import { sanityFetch } from "@/sanity/live";
import { newsQuery } from "@/sanity/queries/news";
import type { News } from "@/sanity/typegen";

export async function loadNewsPage(start: number, limit: number): Promise<News[]> {
  const { data } = await sanityFetch({
    query: newsQuery,
    params: { start, end: start + limit },
  });

  return data;
}
