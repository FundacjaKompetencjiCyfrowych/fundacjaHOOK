import { defineQuery } from "next-sanity";

export const NEWS_PAGE_SIZE = 6;

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(coalesce(publishedAt, _createdAt) desc, _id asc) [$start...$end]`);

export const allNewsQuery = defineQuery(`
  *[_type == "news"] | order(coalesce(publishedAt, _createdAt) desc, _id asc)`);

export const newsBySlugQuery = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    _createdAt,
    publishedAt,
    title,
    slug,
    description,
    article,
    image {
      asset-> {
        _id,
        _ref,
        url,
        metadata {
          lqip,
          dimensions
        },
        altText,
        title,
        description
      },
      crop,
      hotspot
    },
  }
`);
