import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link do socjali",
  type: "object",
  fields: [
    defineField({
      name: "socialLinks",
      title: "Linki do socjali",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
      ],
    }),
  ],
});
