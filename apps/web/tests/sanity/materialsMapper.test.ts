import { describe, expect, it } from "vitest";

import { mapMaterialToFilterItem, type MaterialQueryItem } from "../../lib/mappers/materials";

const makeMaterial = (overrides: Partial<MaterialQueryItem> = {}): MaterialQueryItem => ({
  _id: "material-1",
  title: "Materiał",
  description: "Opis",
  date: "2025-01-01",
  event: "Warsztaty",
  type: "Poradnik",
  area: "Zdrowie",
  format: "PDF",
  size: "1 MB",
  fileAsset: {
    url: "https://example.com/file.pdf",
    extension: "pdf",
    size: 1024,
  },
  ...overrides,
});

describe("mapMaterialToFilterItem", () => {
  it("normalizes legacy labels to canonical enum values", () => {
    const mapped = mapMaterialToFilterItem(
      makeMaterial({
        type: "Nagranie video",
        area: "Rozwój osobisty",
        format: "ZIP",
      })
    );

    expect(mapped.type).toBe("Nagranie wideo");
    expect(mapped.area).toBe("Rozwój Osobisty");
    expect(mapped.format).toBe("Zip");
  });

  it("maps unknown values to Inne", () => {
    const mapped = mapMaterialToFilterItem(
      makeMaterial({
        event: "Nieznane wydarzenie",
        type: "Nieznany typ",
        area: "Nieznany obszar",
        format: "DOCX",
      })
    );

    expect(mapped.event).toBe("Inne");
    expect(mapped.type).toBe("Inne");
    expect(mapped.area).toBe("Inne");
    expect(mapped.format).toBe("Inne");
  });

  it("normalizes format from file extension when format is missing", () => {
    const mapped = mapMaterialToFilterItem(
      makeMaterial({
        format: null,
        fileAsset: { url: "https://example.com/archive.zip", extension: "zip", size: 2048 },
      })
    );

    expect(mapped.format).toBe("Zip");
  });
});
