import { defineField, defineType, defineArrayMember } from "sanity";
import { pageGroups } from "../../utils/groups";
import { seoField, documentNameField } from "../../utils/fields";

export default defineType({
  name: "home",
  title: "Strona główna",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    documentNameField,
    defineField({
      name: "sections",
      title: "Sekcje",
      type: "array",
      group: "content",
      options: {
        layout: "grid",
      },
      of: [
        defineArrayMember({
          name: "sectionImage",
          type: "img",
        }),
        defineArrayMember({
          name: "sectionHero",
          type: "heroSection",
        }),
        defineArrayMember({
          name: "sectionLead",
          type: "leadSection",
        }),
        defineArrayMember({
          name: "sectionPost",
          type: "postsSection",
        }),
        defineArrayMember({
          name: "sectionCardsWithBackground",
          type: "cardswithbackground",
        }),
        defineArrayMember({
          name: "sectionCardsWithRedirect",
          type: "cardswithredirect",
        }),
        defineArrayMember({
          name: "sectionSupport",
          type: "supportSection",
        }),
        defineArrayMember({
          name: "sectionCooperation",
          type: "cooperationSection",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "documentName",
    },
  },
});
