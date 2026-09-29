import { defineQuery } from "next-sanity";

export const PROJECTS_PAGE_SIZE = 6;

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }`);

export const projectsNewestQuery = defineQuery(`
  *[_type == "project" && ($status == "all" || status == $status)]
    | order(coalesce(startDate, _createdAt) desc, _id asc) [$start...$end]`);

export const projectsOldestQuery = defineQuery(`
  *[_type == "project" && ($status == "all" || status == $status)]
    | order(coalesce(startDate, _createdAt) asc, _id asc) [$start...$end]`);

export const projectCountsQuery = defineQuery(`{
  "all": count(*[_type == "project"]),
  "inProgress": count(*[_type == "project" && status == "inProgress"]),
  "planned": count(*[_type == "project" && status == "planned"]),
  "completed": count(*[_type == "project" && status == "completed"])
}`);

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
