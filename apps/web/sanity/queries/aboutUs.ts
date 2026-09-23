import { defineQuery } from "next-sanity";

export const aboutUsQuery = defineQuery(`
  *[_type == "aboutUs"][0] {
    seo,
    mission{
      description,
      image {
        _type,
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
      }
    },
    meaningCards[]{
      _key,
      title,
      image {
        _type,
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
      description
    },
    galleryImages[]{
      _key,
      _type,
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
    teamMembers[]{
      _key,
      name,
      role,
      photo {
        _type,
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
      }
    }
  }
`);
