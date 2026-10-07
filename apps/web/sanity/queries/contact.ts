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
      "orgDetails": *[_type == "organizationDetails" || _id == "organizationDetails"] | order(_updatedAt desc)[0]{
        fullName,
        address,
        krs,
        nip,
        regon
      }
    }
  `
);
