import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardswithbackground",
  title: "Karty z tłem",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł sekcji",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Tło sekcji",
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
        title: title ?? "Karty z tłem",
        subtitle:
          typeof cardCount === "number"
            ? `Typ: Karty z tłem | Kart: ${cardCount}`
            : "Typ: Karty z tłem",
        media,
      };
    },
  },
});
