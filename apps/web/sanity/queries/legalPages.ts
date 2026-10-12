import { defineQuery } from "next-sanity";

export const legalPagesQuery = defineQuery(`
  *[_type == "legalPage" && defined(title) && defined(slug.current)] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const legalPageBySlugQuery = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0] {
    seo,
    title,
    "slug": slug.current,
    body
  }
`);
