import { defineQuery } from "next-sanity";

export const workshopDetailsQuery = defineQuery(`
  *[_type == "workshop" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    datetime,
    location,
    locationMap {
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
        description,
        extension
      },
      crop,
      hotspot
    },
    duration,
    group,
    status,
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
    signupFormUrl,
    materials {
      asset-> {
        _ref,
        url,
        originalFilename
      }
    },
    regulations {
      asset-> {
        _ref,
        url,
        originalFilename,
        extension
      }
    },
  }
`);

export const workshopSlugsQuery = defineQuery(`
  *[_type == "workshop"] {
    "slug": slug.current
  }
`);
