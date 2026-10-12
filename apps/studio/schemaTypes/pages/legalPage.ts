import { defineField, defineType } from "sanity";
import { pageGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";

// Keep in sync with the static top-level routes in apps/web/app/(root).
const reservedSlugs = [
  "about-us",
  "contact",
  "design-system",
  "materials",
  "news",
  "post",
  "projects",
  "support-us",
  "workshops",
  "api",
];

export default defineType({
  name: "legalPage",
  title: "Strona prawna",
  type: "document",
  groups: pageGroups,
  fields: [
    seoField,
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const slug = typeof value === "object" && value ? value.current : undefined;
          if (!slug) return true;
          if (slug.includes("/")) return "Slug strony musi być pojedynczym segmentem adresu.";
          if (reservedSlugs.includes(slug)) {
            return "Ten slug jest zarezerwowany dla istniejącej strony.";
          }
          return true;
        }),
    }),
    defineField({
      name: "body",
      title: "Treść",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title ?? "Strona prawna",
        subtitle: slug ? `/legal/${slug}` : "Brak sluga",
      };
    },
  },
});
