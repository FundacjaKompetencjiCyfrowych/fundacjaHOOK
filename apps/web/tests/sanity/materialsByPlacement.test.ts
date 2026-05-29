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
    const foundationOnly = makeMaterial({
      _id: "foundation",
      placements: [MATERIAL_PLACEMENTS.FOUNDATION_DOCS],
    });
    const mediaOnly = makeMaterial({
      _id: "media",
      placements: [MATERIAL_PLACEMENTS.MEDIA_PARTNERS],
    });
    const both = makeMaterial({
      _id: "both",
      placements: [MATERIAL_PLACEMENTS.FOUNDATION_DOCS, MATERIAL_PLACEMENTS.MEDIA_PARTNERS],
    });
    const none = makeMaterial({ _id: "none", placements: [] });

    const foundationDocs = getMaterialsByPlacement(
      [foundationOnly, mediaOnly, both, none],
      MATERIAL_PLACEMENTS.FOUNDATION_DOCS
    );
    const mediaPartners = getMaterialsByPlacement(
      [foundationOnly, mediaOnly, both, none],
      MATERIAL_PLACEMENTS.MEDIA_PARTNERS
    );

    expect(foundationDocs.map((item) => item._id)).toEqual(["foundation", "both"]);
    expect(mediaPartners.map((item) => item._id)).toEqual(["media", "both"]);
  });

  it("returns an empty list when input is nullish", () => {
    expect(getMaterialsByPlacement(undefined, MATERIAL_PLACEMENTS.FOUNDATION_DOCS)).toEqual([]);
    expect(getMaterialsByPlacement(null, MATERIAL_PLACEMENTS.MEDIA_PARTNERS)).toEqual([]);
  });
});
