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
      name: "mission",
      title: "Misja i wizja",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "description",
          title: "Opis",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "image",
          title: "Zdjęcie",
          type: "img",
          validation: (Rule) => Rule.required(),
        }),
      ],
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
              name: "title",
              title: "Tytuł",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
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
              title: "title",
              description: "description",
              media: "image",
            },
            prepare({ title, description, media }) {
              return {
                title: title ?? "Karta znaczenia",
                subtitle: description,
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
      title: "Galeria",
      type: "array",
      group: "content",
      of: [{ type: "img" }],
      validation: (Rule) => Rule.required().min(1),
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
