"use server";

import { sanityFetch } from "@/sanity/live";
import { workshopsQuery } from "@/sanity/queries/workshops";
import type { WorkshopsQueryResult } from "@/sanity/typegen";

export async function loadWorkshopsPage(
  start: number,
  limit: number
): Promise<WorkshopsQueryResult> {
  const { data } = await sanityFetch({
    query: workshopsQuery,
    params: { start, end: start + limit },
  });

  return data;
}
