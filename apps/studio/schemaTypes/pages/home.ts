import { defineField, defineType, defineArrayMember } from "sanity";
import { pageGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";

const headingFields = () => [
  defineField({
    name: "title",
    title: "Tytuł",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "subtitle",
    title: "Podtytuł",
    type: "text",
    rows: 4,
  }),
];

const imageField = () =>
  defineField({
    name: "image",
    title: "Obraz",
    type: "img",
    validation: (Rule) =>
      Rule.required().custom((value) => {
        const image = value as { asset?: { _ref?: string } } | undefined;
        return image?.asset?._ref ? true : "Wybierz obraz.";
      }),
  });

export default defineType({
  name: "home",
  title: "Strona główna",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    defineField({
      name: "hero",
      title: "Sekcja: Hero",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [imageField(), ...headingFields()],
    }),
    defineField({
      name: "aboutUs",
      title: "Sekcja: Co robimy",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [
        ...headingFields(),
        defineField({
          name: "backgroundImage",
          title: "Obraz tła",
          type: "img",
        }),
        defineField({
          name: "cards",
          title: "Kafelki (4)",
          type: "array",
          validation: (Rule) => Rule.required().length(4),
          of: [
            defineArrayMember({
              name: "homeCard",
              title: "Kafelek",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Tytuł",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Opis",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
                imageField(),
              ],
              preview: { select: { title: "title", media: "image" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "workshops",
      title: "Sekcja: Warsztaty",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [
        ...headingFields(),
        defineField({
          name: "items",
          title: "Wybrane warsztaty (maksymalnie 2)",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "workshop" }],
              options: { disableNew: true },
            }),
          ],
          validation: (Rule) => Rule.max(2).unique(),
        }),
      ],
    }),
    defineField({
      name: "supportUs",
      title: "Sekcja: Wesprzyj nas",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [imageField(), ...headingFields()],
    }),
    defineField({
      name: "projects",
      title: "Sekcja: Projekty",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: [
        ...headingFields(),
        defineField({
          name: "items",
          title: "Wybrane projekty (maksymalnie 3)",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "project" }],
              options: { disableNew: true },
            }),
          ],
          validation: (Rule) => Rule.max(3).unique(),
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Sekcja: Współpraca",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: true },
      validation: (Rule) => Rule.required(),
      fields: headingFields(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Strona główna" };
    },
  },
});
