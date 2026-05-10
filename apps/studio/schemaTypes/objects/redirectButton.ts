import { defineField, defineType } from "sanity";

export default defineType({
  name: "redirectButton",
  title: "Przycisk przekierowania",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Tekst przycisku",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare({ title }) {
      return {
        title: title ?? "Przycisk przekierowania",
      };
    },
  },
});
