import { StructureToolOptions } from "sanity/structure";
import { ComposeIcon, HomeIcon, CogIcon, DocumentIcon } from "@sanity/icons";

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
        S.documentTypeListItem("news").title("Wpisy").icon(ComposeIcon),
        S.documentTypeListItem("material").title("Materiały").icon(DocumentIcon),
        S.documentTypeListItem("cardLandingPage").title("Karty landing page").icon(DocumentIcon),
        S.documentTypeListItem("cardWithRedirect")
          .title("Karty z przekierowaniem")
          .icon(DocumentIcon),
        S.documentTypeListItem("redirectButton")
          .title("Przyciski przekierowania")
          .icon(DocumentIcon),
        S.documentTypeListItem("workshop").title("Warsztaty").icon(DocumentIcon),
        S.documentTypeListItem("project").title("Projekty").icon(DocumentIcon),
        S.documentTypeListItem("event").title("Wydarzenia").icon(DocumentIcon),
        S.divider().title("Ustawienia"),
        S.listItem()
          .title("Ustawienia")
          .icon(CogIcon)
          .child(S.document().schemaType("settings").documentId("settings")),
      ]),
};
