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
          title: "Obraz",
          type: "img",
        }),
        defineArrayMember({
          name: "sectionHero",
          title: "Sekcja Hero",
          type: "heroSection",
        }),
        defineArrayMember({
          name: "sectionLead",
          title: "Nagłówek",
          type: "leadSection",
        }),
        defineArrayMember({
          name: "sectionPost",
          title: "Posty",
          type: "postsSection",
        }),
        defineArrayMember({
          name: "sectionCardsWithBackground",
          title: "Karty z backgroundem",
          type: "cardswithbackground",
        }),
        defineArrayMember({
          name: "sectionCardsWithRedirect",
          title: "Karty z przekierowaniem",
          type: "cardswithredirect",
        }),
        defineArrayMember({
          name: "sectionSupport",
          title: "Wsparcie",
          type: "supportSection",
        }),
        defineArrayMember({
          name: "sectionCooperation",
          title: "Współpraca",
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
