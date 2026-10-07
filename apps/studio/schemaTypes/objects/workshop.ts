import { defineField, defineType } from "sanity";

export default defineType({
  name: "workshop",
  title: "Warsztaty",
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
      name: "datetime",
      title: "Data i godzina",
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

    defineField({
      name: "duration",
      title: "Czas trwania (godziny)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
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
      name: "locationMap",
      title: "Mapa lokalizacji",
      type: "img",
      description: "Obraz mapy z zaznaczonym miejscem warsztatu.",
    }),

    defineField({
      name: "signupFormUrl",
      title: "Link do formularza zapisów",
      type: "url",
      description: "URL do Google Form lub innego formularza zapisów",
    }),

    defineField({
      name: "materials",
      title: "Materiały",
      type: "file",
      description: "Materiały do pobrania (PDF, ZIP, itp.)",
    }),

    defineField({
      name: "regulations",
      title: "Regulamin",
      type: "file",
      description: "Regulamin warsztatu do pobrania.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Warsztat",
        media,
      };
    },
  },
});
