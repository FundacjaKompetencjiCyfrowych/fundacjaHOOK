import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import link from "./objects/link";
import logo from "./objects/logo";

export default defineType({
  name: "settings",
  title: "Ustawienia",
  type: "document",
  description: "top level description",
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Domyślne Metadane",
      description: "Metadane domyślne dla wszystkich podstron",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "logo",
      group: "content",
    }),
    defineField({
      name: "link",
      title: "Linki do socjali",
      type: "link",
      group: "content",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Ustawienia",
      };
    },
  },
});
