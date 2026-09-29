import { defineQuery } from "next-sanity";

export const WORKSHOPS_PAGE_SIZE = 4;

export const workshopsQuery = defineQuery(`
  *[_type == "workshop"] | order(_createdAt desc) [$start...$end]`);
