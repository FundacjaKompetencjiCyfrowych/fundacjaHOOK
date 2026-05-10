import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardswithbackground",
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
      name: "subtitle",
      title: "Podtytul",
      type: "string",
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
      cardCount: "cards.length",
    },
    prepare({ title, media, cardCount }) {
      return {
        title: title ?? "Karty z backgroundem",
        subtitle:
          typeof cardCount === "number"
            ? `Typ: Karty z backgroundem | Kart: ${cardCount}`
            : "Typ: Karty z backgroundem",
        media,
      };
    },
  },
});
