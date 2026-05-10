import { defineField, defineType } from "sanity";

export default defineType({
  name: "supportSection",
  title: "Wsparcie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytul sekcji",
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
      name: "krsNumber",
      title: "Numer KRS",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      title: "Tlo sekcji",
      type: "img",
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
      media: "backgroundImage",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Wsparcie",
        media,
      };
    },
  },
});
