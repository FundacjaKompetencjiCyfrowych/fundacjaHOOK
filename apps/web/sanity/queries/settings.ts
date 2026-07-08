import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    logoTop {
      logo {
        asset-> {
          url
        }
      }
    },
    logoBottom {
      logo {
        asset-> {
          url
        }
      }
    },
    address,
    krs,
    link {
      socialLinks {
        facebook,
        instagram,
        linkedin
      }
    }
  }
`);

export const logoQuery = defineQuery(`
  *[_type == "settings"][0] {
    logoTop {
      logo {
        asset-> {
          url
        }
      }
    },
  }
`);
