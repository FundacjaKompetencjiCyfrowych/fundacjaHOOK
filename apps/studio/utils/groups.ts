import { ALL_FIELDS_GROUP } from "sanity";

export const contentSeoGroups = [
  { name: "content", title: "Treść", default: true },
  { name: "seo", title: "SEO" },
  { ...ALL_FIELDS_GROUP, hidden: true },
];

/** content, seo (all fields group disabled)*/
export const pageGroups = [
  {
    name: "content",
    title: "Treść",
  },
  {
    name: "seo",
    title: "SEO",
  },
  {
    name: "studio",
    title: "Studio",
  },
  {
    ...ALL_FIELDS_GROUP,
    hidden: true,
  },
];
