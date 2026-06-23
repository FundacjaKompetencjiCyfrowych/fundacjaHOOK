import { defineQuery } from "next-sanity";

export const newsQuery = defineQuery(`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    description,
    slug,
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
