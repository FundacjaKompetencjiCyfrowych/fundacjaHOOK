import { defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";

export default defineType({
  name: "material",
  title: "Materiał",
  type: "document",
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
      name: "file",
      title: "Plik",
      type: "file",
      group: "content",
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
      name: "size",
      title: "Rozmiar",
      type: "string",
      description: "Opcjonalne. Gdy puste, rozmiar zostanie wyliczony z metadanych pliku.",
      group: "content",
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
          { title: "Dokumenty fundacji", value: "foundationDocs" },
          { title: "Dla mediów i partnerów", value: "mediaPartners" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      type: "type",
      media: "file",
    },
    prepare({ title, date, type, media }) {
      const dateLabel = typeof date === "string" ? date : "brak daty";
      const typeLabel = typeof type === "string" ? type : "brak typu";
      return {
        title: title ?? "Bez tytułu",
        subtitle: `${dateLabel} • ${typeLabel}`,
        media,
      };
    },
  },
});
