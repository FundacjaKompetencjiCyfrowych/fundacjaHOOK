import { defineQuery } from "next-sanity";

export const contactQuery = defineQuery(
  `
    {
      "page": *[_type == "contact"][0]{
        gdprClause,
        departments[] {
          name,
          email,
          phone
        }
      },
      "orgDetails": *[_id == "organizationDetails"][0]{
        fullName,
        address,
        krs,
        nip,
        regon
      }
    }
  `
);
