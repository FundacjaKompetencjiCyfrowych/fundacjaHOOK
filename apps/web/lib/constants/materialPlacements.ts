export const MATERIAL_PLACEMENTS = {
  FOUNDATION_DOCS: "foundationDocs",
  MEDIA_PARTNERS: "mediaPartners",
} as const;

export type MaterialPlacement = (typeof MATERIAL_PLACEMENTS)[keyof typeof MATERIAL_PLACEMENTS];

export const MATERIAL_PLACEMENT_VALUES: MaterialPlacement[] = [
  MATERIAL_PLACEMENTS.FOUNDATION_DOCS,
  MATERIAL_PLACEMENTS.MEDIA_PARTNERS,
];
