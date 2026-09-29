"use server";

import { sanityFetch } from "@/sanity/live";
import { WORKSHOPS_PAGE_SIZE, workshopsQuery } from "@/sanity/queries/workshops";
import type { Workshop } from "@/sanity/typegen";

export async function loadWorkshopsPage(start: number): Promise<Workshop[]> {
  const { data } = await sanityFetch({
    query: workshopsQuery,
    params: { start, end: start + WORKSHOPS_PAGE_SIZE },
  });

  return data as Workshop[];
}
