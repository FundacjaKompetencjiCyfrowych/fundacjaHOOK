import { defineQuery } from "next-sanity";

export const workshopDetailsQuery = defineQuery(`
  *[_type == "workshop" && slug.current == $slug][0] {
    _id,
    title,
    description,
    datetime,
    location,
    duration,
    group,
    status,
    image {
      asset-> {
        url
      }
    },
  }
`);
