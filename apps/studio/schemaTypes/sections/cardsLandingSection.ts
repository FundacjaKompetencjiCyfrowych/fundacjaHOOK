import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardsLandingSection",
  title: "Karty z backgroundem",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytul sekcji",
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
      name: "cards",
      title: "Karty",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "cardLandingPage" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Karty landing page",
        media,
      };
    },
  },
});
