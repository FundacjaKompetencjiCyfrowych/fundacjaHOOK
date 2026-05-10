import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "heroSection",
  title: "Sekcja Hero",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Obraz",
      type: "image",
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Sekcja Hero",
        subtitle: "Typ: Sekcja Hero",
        media,
      };
    },
  },
});
