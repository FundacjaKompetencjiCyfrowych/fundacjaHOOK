import { defineType, defineField } from "sanity";

export default defineType({
  name: "departmentCard",
  title: "Karta działu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
  ],
});
