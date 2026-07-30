import { describe, expect, it } from "vitest";

import { MATERIAL_PLACEMENTS } from "../../lib/constants/materialPlacements";
import type { MaterialQueryItem } from "../../lib/mappers/materials";
import { getMaterialsByPlacement } from "../../sanity/queries/materialsByPlacement";

const makeMaterial = (overrides: Partial<MaterialQueryItem> = {}): MaterialQueryItem => ({
  _id: "material-id",
  title: "Material",
  description: "Opis",
  date: "2025-01-01",
  event: "Event",
  type: "Poradnik",
  area: "Zdrowie",
  format: "PDF",
  size: "1 MB",
  fileAsset: { url: "https://example.com/file.pdf", extension: "pdf", size: 1024 },
  placements: [],
  ...overrides,
});

describe("getMaterialsByPlacement", () => {
  it("returns only materials matching the requested placement", () => {
    const aboutUsDocsOnly = makeMaterial({
      _id: "about-us-docs",
      placements: [MATERIAL_PLACEMENTS.ABOUT_US_DOCS],
    });
    const aboutUsMediaOnly = makeMaterial({
      _id: "about-us-media",
      placements: [MATERIAL_PLACEMENTS.ABOUT_US_MEDIA],
    });
    const both = makeMaterial({
      _id: "both",
      placements: [MATERIAL_PLACEMENTS.ABOUT_US_DOCS, MATERIAL_PLACEMENTS.ABOUT_US_MEDIA],
    });
    const none = makeMaterial({ _id: "none", placements: [] });

    const aboutUsDocs = getMaterialsByPlacement(
      [aboutUsDocsOnly, aboutUsMediaOnly, both, none],
      MATERIAL_PLACEMENTS.ABOUT_US_DOCS
    );
    const aboutUsMedia = getMaterialsByPlacement(
      [aboutUsDocsOnly, aboutUsMediaOnly, both, none],
      MATERIAL_PLACEMENTS.ABOUT_US_MEDIA
    );

    expect(aboutUsDocs.map((item) => item._id)).toEqual(["about-us-docs", "both"]);
    expect(aboutUsMedia.map((item) => item._id)).toEqual(["about-us-media", "both"]);
  });

  it("returns an empty list when input is nullish", () => {
    expect(getMaterialsByPlacement(undefined, MATERIAL_PLACEMENTS.ABOUT_US_DOCS)).toEqual([]);
    expect(getMaterialsByPlacement(null, MATERIAL_PLACEMENTS.ABOUT_US_MEDIA)).toEqual([]);
  });
});
