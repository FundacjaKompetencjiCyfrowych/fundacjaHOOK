import { defineQuery } from "next-sanity";

export const materialsQuery = defineQuery(`
  *[_type == "material"] | order(date desc) {
    _id,
    title,
    description,
    date,
    event,
    type,
    area,
    format,
    linkUrl,
    size,
    placements,
    "fileAsset": file.asset->{
      url,
      extension,
      size
    }
  }
`);
