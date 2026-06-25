import { defineQuery } from "next-sanity";

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }`);

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(startDate desc, _createdAt desc)`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    events[]->{
      _id,
      title,
      date,
      location
    }
  }`);

export default projectsQuery;
