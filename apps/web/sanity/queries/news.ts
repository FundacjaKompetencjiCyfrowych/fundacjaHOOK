import { defineQuery } from "next-sanity";

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(_createdAt desc)`);

export const newsBySlugQuery = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
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
