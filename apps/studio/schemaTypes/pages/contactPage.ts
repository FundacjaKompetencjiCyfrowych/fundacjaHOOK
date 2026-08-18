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
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "emailRecipient",
      title: "Email odbiorcy",
      type: "string",
      description: "Do kogo będą wysyłane wiadomości",
    }),
  ],
});
