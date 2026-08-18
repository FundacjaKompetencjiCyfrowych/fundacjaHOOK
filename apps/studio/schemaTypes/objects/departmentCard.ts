import { defineType, defineField } from "sanity";

export default defineType({
  name: "departmentCard",
  title: "Karta Działu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa działu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email działu",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon działu",
      type: "string",
    }),
  ],
});
