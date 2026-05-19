import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardswithredirect",
  title: "Karty z przekierowaniem",
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
      name: "cards",
      title: "Karty",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "cardWithRedirect" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "button",
      title: "Przycisk przekierowania",
      type: "reference",
      to: [{ type: "redirectButton" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      cardCount: "cards.length",
    },
    prepare({ title, cardCount }) {
      return {
        title: title ?? "Karty z przekierowaniem",
        subtitle:
          typeof cardCount === "number"
            ? `Typ: Karty z przekierowaniem | Kart: ${cardCount}`
            : "Typ: Karty z przekierowaniem",
      };
    },
  },
});
