"use server";

import { sanityFetch } from "@/sanity/live";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { materialsNewestPageQuery, materialsOldestPageQuery } from "@/sanity/queries/materials";
import type { MaterialFilterItem } from "@/lib/types/materials";
import type { MaterialsPageFilters } from "../_lib/materialsFilters.types";

export async function loadMaterialsPage(
  start: number,
  filters: MaterialsPageFilters,
  limit: number
): Promise<MaterialFilterItem[]> {
  const query = filters.sort === "oldest" ? materialsOldestPageQuery : materialsNewestPageQuery;
  const { data } = await sanityFetch({
    query,
    params: {
      search: filters.search.trim().toLowerCase(),
      event: filters.event === "all" ? "all" : filters.event.toLowerCase(),
      types: filters.types.map((value) => value.toLowerCase()),
      areas: filters.areas.map((value) => value.toLowerCase()),
      formats: filters.formats.map((value) => value.toLowerCase()),
      dateFrom: filters.dateFrom ?? null,
      dateTo: filters.dateTo ?? null,
      start,
      end: start + limit,
    },
  });

  return mapMaterialsToFilterItems(data);
}
