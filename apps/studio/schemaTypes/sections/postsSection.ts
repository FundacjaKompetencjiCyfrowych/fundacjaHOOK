import { defineField, defineType } from "sanity";

export default defineType({
  name: "postsSection",
  title: "Posty",
  type: "object",
  fields: [
    defineField({
      name: "displayNumber",
      title: "Liczba postów",
      type: "number",
    }),
  ],
  preview: {
    select: {
      displayNumber: "displayNumber",
    },
    prepare({ displayNumber }) {
      return {
        title: "Posty",
        subtitle:
          typeof displayNumber === "number"
            ? `Liczba postów: ${displayNumber}`
            : "Liczba postów: domyślna",
      };
    },
  },
});
