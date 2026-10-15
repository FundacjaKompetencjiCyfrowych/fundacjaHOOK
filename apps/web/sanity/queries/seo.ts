import { defineQuery } from "next-sanity";

export const seoMetadataQuery = defineQuery(`
  {
    "defaults": *[_type == "settings"][0].seo {
      ...,
      ogImage { asset-> { url } }
    },
    "page": *[
      _type == $type &&
      ($type != "home" || _id == "home") &&
      ($slug == null || slug.current == $slug)
    ][0] {
      _id,
      seo {
        ...,
        ogImage { asset-> { url } }
      }
    }
  }
`);
