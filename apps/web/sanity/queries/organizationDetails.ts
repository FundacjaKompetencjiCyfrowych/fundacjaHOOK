import { defineQuery } from "next-sanity";

export const organizationDetailsQuery = defineQuery(`
  *[_id == "organizationDetails"][0] {
    address,
    krs
  }
`);
