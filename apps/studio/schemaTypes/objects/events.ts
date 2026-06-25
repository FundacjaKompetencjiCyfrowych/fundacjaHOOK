import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Miejsce",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
