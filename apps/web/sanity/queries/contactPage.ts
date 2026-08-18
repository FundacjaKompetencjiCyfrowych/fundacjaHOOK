import { defineQuery } from "next-sanity";

export const contactPageQuery = defineQuery(
  `
    *[_type == "contactPage"][0]{
      title,
      departments[] {
        name,
        email,
        phone
      },
      orgDetails {
        fullName,
        address,
        krs,
        nip,
        regon
      }
    }
  `
);
