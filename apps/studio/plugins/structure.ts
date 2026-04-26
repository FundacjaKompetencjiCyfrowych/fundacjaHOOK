import { StructureToolOptions } from "sanity/structure";
import { ComposeIcon, HomeIcon, UsersIcon, CogIcon } from "@sanity/icons";

/**
 * Structure of the Sanity Studio
 * @see https://www.sanity.io/docs/studio/structure-tool
 */
export const structure: StructureToolOptions = {
  structure: (S) =>
    S.list()
      .id("content")
      .title("Content")
      .items([
        S.divider().title("Strony"),
        S.listItem()
          .title("Strona główna")
          .icon(HomeIcon)
          .child(S.document().schemaType("home").documentId("home")),
        S.divider().title("Kolekcje"),
        S.documentTypeListItem("post").title("Wpisy").icon(ComposeIcon),
        S.documentTypeListItem("author").title("Autorzy").icon(UsersIcon),
        S.divider().title("Ustawienia"),
        S.listItem()
          .title("Ustawienia")
          .icon(CogIcon)
          .child(S.document().schemaType("settings").documentId("settings")),
      ]),
};
