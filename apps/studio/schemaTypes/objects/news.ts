import { contentSeoGroups } from "../../utils/groups";
import { seoField } from "../../utils/fields";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "news",
  title: "Aktualności",
  type: "document",
  icon: DocumentIcon,
  groups: contentSeoGroups,
  fields: [
    seoField,
    defineField({
      group: "content",
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "image",
      title: "Obraz",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "description",
      title: "Opis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "publishedAt",
      title: "Data publikacji",
      type: "date",
    }),
    defineField({
      group: "content",
      name: "article",
      title: "Treść artykułu",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", publishedAt: "publishedAt" },
    prepare({ title, slug, publishedAt }) {
      const subtitle = [publishedAt, slug ? `/news/${slug}` : undefined]
        .filter(Boolean)
        .join(" • ");

      return {
        title: title?.trim() || "Bez tytułu",
        subtitle: subtitle || undefined,
        media: DocumentIcon,
      };
    },
  },
});
