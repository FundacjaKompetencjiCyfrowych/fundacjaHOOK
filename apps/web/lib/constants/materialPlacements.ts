export const MATERIAL_PLACEMENTS = {
  ABOUT_US_MEDIA: "aboutUsMedia",
  ABOUT_US_DOCS: "aboutUsDocs",
} as const;

export type MaterialPlacement = (typeof MATERIAL_PLACEMENTS)[keyof typeof MATERIAL_PLACEMENTS];

export const MATERIAL_PLACEMENT_VALUES: MaterialPlacement[] = [
  MATERIAL_PLACEMENTS.ABOUT_US_MEDIA,
  MATERIAL_PLACEMENTS.ABOUT_US_DOCS,
];
