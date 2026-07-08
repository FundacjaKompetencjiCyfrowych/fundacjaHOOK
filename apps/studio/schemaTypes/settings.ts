import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";

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
      name: "logoTop",
      title: "Logo (górne)",
      type: "logo",
      group: "content",
    }),
    defineField({
      name: "logoBottom",
      title: "Logo (dolne)",
      type: "logo",
      group: "content",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "krs",
      title: "Numer KRS",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().length(10),
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
