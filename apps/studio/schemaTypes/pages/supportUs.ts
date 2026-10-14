import { defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";
import { documentNameField, seoField } from "../../utils/fields";

export default defineType({
  name: "supportUs",
  title: "Wesprzyj nas",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    documentNameField,
    defineField({
      name: "volunteerDescription",
      title: "Opis wolontariatu",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "volunteerFormUrl",
      title: "Adres formularza wolontariatu",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accountNumber",
      title: "Numer konta",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "transferTitle",
      title: "Tytuł przelewu",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Wesprzyj nas" };
    },
  },
});
