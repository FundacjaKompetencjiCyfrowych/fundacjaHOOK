import { defineQuery } from "next-sanity";

export const WORKSHOPS_PAGE_SIZE = 4;

export const workshopsQuery = defineQuery(`
  *[_type == "workshop"] | order(datetime asc, _id asc) [$start...$end] {
    _id,
    title,
    slug,
    image,
    status,
    location,
    datetime,
    duration,
    group
  }`);
