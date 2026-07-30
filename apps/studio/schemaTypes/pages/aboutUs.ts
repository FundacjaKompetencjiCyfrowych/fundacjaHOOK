import { defineArrayMember, defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";
import { documentNameField, seoField } from "../../utils/fields";

export default defineType({
  name: "aboutUs",
  title: "O nas",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    documentNameField,
    defineField({
      name: "missionDescription",
      title: "Misja i wizja - opis",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionImage",
      title: "Misja i wizja - zdjęcie",
      type: "img",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "meaningCards",
      title: "Karty znaczenia (4)",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "meaningCard",
          title: "Karta znaczenia",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Grafika karty",
              type: "img",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "description",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title ? `${title}`.slice(0, 60) : "Karta znaczenia",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
    defineField({
      name: "galleryImages",
      title: "Galeria (do 6 zdjęć)",
      type: "array",
      group: "content",
      of: [{ type: "img" }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: "teamMembers",
      title: "Zespół",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "teamMember",
          title: "Osoba",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Imię i nazwisko",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Rola w fundacji",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "photo",
              title: "Zdjęcie",
              type: "img",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "photo",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title ?? "Osoba zespołu",
                subtitle,
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "documentName",
    },
    prepare({ title }) {
      return {
        title: title ?? "O nas",
      };
    },
  },
});
