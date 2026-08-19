import { defineQuery } from "next-sanity";

export const contactPageQuery = defineQuery(
  `
    {
      "page": *[_type == "contactPage"][0]{
        title,
        departments[] {
          name,
          email,
          phone
        }
      },
      "orgDetails": *[_type == "organizationDetails"][0]{
        fullName,
        address,
        krs,
        nip,
        regon
      }
    }
  `
);
