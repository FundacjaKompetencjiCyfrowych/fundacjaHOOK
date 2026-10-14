import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";

export default defineType({
  name: "material",
  title: "Materiał",
  type: "document",
  icon: DocumentIcon,
  groups: pageGroups,
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data publikacji",
      type: "date",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Wydarzenie",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Warsztaty", value: "Warsztaty" },
          { title: "Konferencja", value: "Konferencja" },
          { title: "Webinar", value: "Webinar" },
          { title: "Szkolenie", value: "Szkolenie" },
          { title: "Inne", value: "Inne" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Workbook", value: "Workbook" },
          { title: "Checklist", value: "Checklist" },
          { title: "Poradnik", value: "Poradnik" },
          { title: "Publikacja", value: "Publikacja" },
          { title: "Nagranie wideo", value: "Nagranie wideo" },
          { title: "Szablon", value: "Szablon" },
          { title: "Infografika", value: "Infografika" },
          { title: "Inne", value: "Inne" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "area",
      title: "Obszar",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Zdrowie", value: "Zdrowie" },
          { title: "Prawo", value: "Prawo" },
          { title: "Finanse", value: "Finanse" },
          { title: "Kariera", value: "Kariera" },
          { title: "Rozwój Osobisty", value: "Rozwój Osobisty" },
          { title: "Rodzicielstwo", value: "Rodzicielstwo" },
          { title: "Inne", value: "Inne" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "PDF", value: "PDF" },
          { title: "Zip", value: "Zip" },
          { title: "MP4", value: "MP4" },
          { title: "Link", value: "Link" },
          { title: "Inne", value: "Inne" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkUrl",
      title: "Adres linku",
      type: "url",
      group: "content",
      description: "Pełny adres strony rozpoczynający się od http:// lub https://.",
      hidden: ({ document }) => document?.format !== "Link",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.format !== "Link") return true;
          if (!value) return "Podaj adres linku.";

          const invalidUrlMessage = "Podaj poprawny, pełny adres HTTP lub HTTPS.";
          let url: URL;

          try {
            url = new URL(value);
          } catch {
            // URL parsing throws for malformed input; return a validation error to keep Studio usable.
            return invalidUrlMessage;
          }

          return /^https?:\/\//i.test(value) && ["http:", "https:"].includes(url.protocol)
            ? true
            : invalidUrlMessage;
        }),
    }),
    defineField({
      name: "file",
      title: "Plik",
      type: "file",
      group: "content",
      hidden: ({ document }) => document?.format === "Link",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.format === "Link") return true;
          return value?.asset?._ref ? true : "Dodaj plik materiału.";
        }),
    }),
    defineField({
      name: "size",
      title: "Rozmiar",
      type: "string",
      description: "Opcjonalne. Gdy puste, rozmiar zostanie wyliczony z metadanych pliku.",
      group: "content",
      hidden: ({ document }) => document?.format === "Link",
    }),
    defineField({
      name: "placements",
      title: "Widoczność na stronach",
      type: "array",
      group: "content",
      description:
        "Wybierz miejsca publikacji. Implementacje stron powinny opierać się na tym polu, a nie na własnych filtrach.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "O nas: dla mediów i partnerów", value: "aboutUsMedia" },
          { title: "O nas: dokumenty fundacji", value: "aboutUsDocs" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      type: "type",
    },
    prepare({ title, date, type }) {
      return {
        title: title?.trim() || "Bez tytułu",
        subtitle:
          [date?.slice(0, 10).split("-").reverse().join("."), type].filter(Boolean).join(" • ") ||
          undefined,
        media: DocumentIcon,
      };
    },
  },
});
