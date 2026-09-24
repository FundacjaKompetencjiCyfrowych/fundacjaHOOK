import { defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";
import { documentNameField, seoField } from "../../utils/fields";

export default defineType({
  name: "contact",
  title: "Kontakt",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    documentNameField,
    defineField({
      name: "departments",
      title: "Działy kontaktowe",
      type: "array",
      group: "content",
      of: [{ type: "departmentCard" }],
    }),
  ],
  preview: {
    select: {
      title: "documentName",
    },
    prepare({ title }) {
      return {
        title: title ?? "Kontakt",
      };
    },
  },
});
