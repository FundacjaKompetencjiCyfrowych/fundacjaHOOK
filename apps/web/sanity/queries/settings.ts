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
    link {
      "socialLinks": {
        "facebook": coalesce(facebook, socialLinks.facebook),
        "instagram": coalesce(instagram, socialLinks.instagram),
        "linkedin": coalesce(linkedin, socialLinks.linkedin)
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
