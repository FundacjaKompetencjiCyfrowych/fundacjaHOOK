import { defineField, defineType } from "sanity";

export default defineType({
  name: "organizationDetails",
  title: "Dane rejestrowe fundacji",
  type: "object",
  fields: [
    defineField({
      name: "fullName",
      title: "Pełna nazwa",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
    }),
    defineField({
      name: "krs",
      title: "KRS",
      type: "string",
    }),
    defineField({
      name: "nip",
      title: "NIP",
      type: "string",
    }),
    defineField({
      name: "regon",
      title: "REGON",
      type: "string",
    }),
  ],
});
