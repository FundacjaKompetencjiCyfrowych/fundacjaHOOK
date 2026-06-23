import { defineQuery } from "next-sanity";

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(_createdAt desc)`);
