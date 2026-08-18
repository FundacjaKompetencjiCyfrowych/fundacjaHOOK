import { defineQuery } from "next-sanity";

export const contactPageQuery = defineQuery(
  `
    *[_type == "contactPage"][0]{
    title,
    description,
    emailRecipient
    }
    `
);
