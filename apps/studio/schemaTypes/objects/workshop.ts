import { contentSeoGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";
import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "workshop",
  title: "Warsztaty",
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
      name: "datetime",
      title: "Data i godzina",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      group: "content",
      name: "location",
      title: "Miejsce",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      group: "content",
      name: "duration",
      title: "Czas trwania (godziny)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      group: "content",
      name: "group",
      title: "Grupa docelowa",
      type: "string",
      options: {
        list: [
          { title: "Dorośli 18+", value: "adult" },
          { title: "Młodzież 14-18 lat", value: "teen" },
          { title: "Dzieci 8-13 lat", value: "children" },
          { title: "Rodziny z dziećmi", value: "family" },
        ],
      },
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
      name: "locationMap",
      title: "Mapa lokalizacji",
      type: "img",
      description: "Obraz mapy z zaznaczonym miejscem warsztatu.",
    }),

    defineField({
      group: "content",
      name: "signupFormUrl",
      title: "Link do formularza zapisów",
      type: "url",
      description: "Adres Formularzy Google lub innego formularza zapisów",
    }),

    defineField({
      group: "content",
      name: "materials",
      title: "Materiały",
      type: "file",
      description: "Materiały do pobrania (PDF, ZIP, itp.)",
    }),

    defineField({
      group: "content",
      name: "regulations",
      title: "Regulamin",
      type: "file",
      description: "Regulamin warsztatu do pobrania.",
    }),
  ],
  preview: {
    select: { title: "title", date: "datetime", status: "status" },
    prepare({ title, date, status }) {
      const statusLabels: Record<string, string> = {
        inProgress: "W trakcie",
        planned: "Planowane",
        completed: "Zakończone",
      };
      return {
        title: title?.trim() || "Bez tytułu",
        subtitle:
          [date?.slice(0, 10).split("-").reverse().join("."), statusLabels[status]]
            .filter(Boolean)
            .join(" • ") || undefined,
        media: DocumentIcon,
      };
    },
  },
});
