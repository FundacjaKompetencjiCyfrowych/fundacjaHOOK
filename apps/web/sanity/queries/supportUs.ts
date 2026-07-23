import { defineQuery } from "next-sanity";

export const supportUsQuery = defineQuery(`
  *[_type == "supportUs"][0] {
    seo,
    volunteerDescription,
    accountNumber,
    transferTitle,
    volunteerButton->{
      _id,
      text,
      href
    }
  }
`);
