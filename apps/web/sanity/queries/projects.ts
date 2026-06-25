import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc)`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]`);

export default projectsQuery;
