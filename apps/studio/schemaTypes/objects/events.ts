import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Wydarzenie",
  type: "document",
  icon: DocumentIcon,
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
  preview: {
    select: { title: "title", date: "date", location: "location" },
    prepare({ title, date, location }) {
      return {
        title: title?.trim() || "Bez tytułu",
        subtitle:
          [date?.slice(0, 10).split("-").reverse().join("."), location]
            .filter(Boolean)
            .join(" • ") || undefined,
        media: DocumentIcon,
      };
    },
  },
});
