import { defineQuery } from "next-sanity";

const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc)`);

export default projectsQuery;
