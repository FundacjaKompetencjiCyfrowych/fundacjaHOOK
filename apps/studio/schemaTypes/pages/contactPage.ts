import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Kontakt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "departments",
      title: "Działy kontaktowe",
      type: "array",
      of: [{ type: "departmentCard" }],
    }),
  ],
});
