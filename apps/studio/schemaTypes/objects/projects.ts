import { contentSeoGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projekty",
  type: "document",
  icon: DocumentIcon,
  groups: contentSeoGroups,
  fields: [
    seoField,
    defineField({
      group: "content",
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
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
      group: "content",
      name: "image",
      title: "Obraz",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "article",
      title: "Artykuł",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
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
      group: "content",
      name: "startDate",
      title: "Data rozpoczęcia",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "endDate",
      title: "Data zakończenia",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "events",
      title: "Wydarzenia",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      validation: (Rule) =>
        Rule.required().min(1).error("Projekt musi mieć przynajmniej jedno wydarzenie"),
    }),
  ],
  preview: {
    select: { title: "title", status: "status" },
    prepare({ title, status }) {
      const statusLabels: Record<string, string> = {
        inProgress: "W trakcie",
        planned: "Planowane",
        completed: "Zakończone",
      };
      return {
        title: title?.trim() || "Bez tytułu",
        subtitle: statusLabels[status],
        media: DocumentIcon,
      };
    },
  },
});
