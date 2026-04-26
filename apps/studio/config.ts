export const LANGAUGE_FIELD = "locale";

type DocumentConfig = {
  _type: string;
  id?: string;
  singleton?: boolean;
  root?: boolean;
  path?: string;
  slug?: boolean;
};

// Please run `pnpm run singletons` to generate translation metadata pages when adding singleton types
export const DOCUMENTS: DocumentConfig[] = [
  { _type: "home", id: "home", singleton: true, root: true },
  { _type: "settings", id: "settings" },
  { _type: "post", path: "/post", slug: true },
  { _type: "author" },
];
