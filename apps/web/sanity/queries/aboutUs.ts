import { defineQuery } from "next-sanity";

export const aboutUsQuery = defineQuery(`
  *[_type == "aboutUs"][0] {
    seo,
    missionDescription,
    missionImage,
    meaningDescription,
    meaningCards[]{
      _key,
      image,
      description
    },
    galleryImages,
    teamMembers[]{
      _key,
      name,
      role,
      photo
    }
  }
`);
