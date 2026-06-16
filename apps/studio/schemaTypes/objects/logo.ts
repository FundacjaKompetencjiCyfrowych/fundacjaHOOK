import { defineField, defineType } from "sanity";

export default defineType({
  name: "logo",
  title: "Logo",
  type: "object",
  fields: [
    defineField({
      name: "logo",
      title: "Logo (SVG)",
      type: "file",
      options: {
        accept: "image/svg+xml",
      },
    }),
  ],
});
