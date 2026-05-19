import { defineField, defineType } from "sanity";

export default defineType({
  name: "cooperationSection",
  title: "Współpraca",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Przycisk",
      type: "reference",
      to: [{ type: "redirectButton" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ?? "Współpraca",
        subtitle: "Typ: Współpraca",
      };
    },
  },
});
