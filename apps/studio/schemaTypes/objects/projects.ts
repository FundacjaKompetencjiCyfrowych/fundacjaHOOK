import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projekty",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Obraz",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "article",
      title: "Artykuł",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "W trakcie", value: "inProgress" },
          { title: "Planowane", value: "planned" },
          { title: "Zakończone", value: "completed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Data rozpoczęcia",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Data zakończenia",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "events",
      title: "Wydarzenia",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      validation: (Rule) =>
        Rule.required().min(1).error("Projekt musi mieć przynajmniej jedno wydarzenie"),
    }),
  ],
});
