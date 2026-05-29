import { describe, expect, it } from "vitest";

import {
  countValues,
  filterAndSortMaterials,
  getActiveFilterCount,
  type MaterialFilterItem,
  toggleSet,
} from "../../app/_components/Filtering/materialyFilters.utils";

const makeMaterial = (overrides: Partial<MaterialFilterItem> = {}): MaterialFilterItem => ({
  title: "Test material",
  date: "2025-01-01",
  description: "Test description",
  fileUrl: "https://example.com/file.pdf",
  format: "PDF",
  size: "1 MB",
  event: "Warsztaty",
  type: "Poradnik",
  area: "Zdrowie",
  ...overrides,
});

const FIXTURES: MaterialFilterItem[] = [
  makeMaterial({
    title: "Przewodnik",
    date: "2025-03-15",
    format: "PDF",
    type: "Poradnik",
    area: "Zdrowie",
    event: "Warsztaty",
  }),
  makeMaterial({
    title: "Infografika",
    date: "2025-01-10",
    format: "Link",
    type: "Infografika",
    area: "Finanse",
    event: "Webinar",
    description: "Opis infografiki",
  }),
  makeMaterial({
    title: "Arkusz",
    date: "2024-11-05",
    format: "Zip",
    type: "Checklist",
    area: "Kariera",
    event: "Szkolenie",
  }),
  makeMaterial({
    title: "Nagranie",
    date: "2024-08-20",
    format: "MP4",
    type: "Nagranie wideo",
    area: "Zdrowie",
    event: "Warsztaty",
  }),
];

// ─────────────────────────────────────────────────────────────────────────────
// toggleSet
// ─────────────────────────────────────────────────────────────────────────────
describe("toggleSet", () => {
  it("adds a value that is not in the set", () => {
    const result = toggleSet(new Set(["a"]), "b");
    expect(result).toEqual(new Set(["a", "b"]));
  });

  it("removes a value that is already in the set", () => {
    const result = toggleSet(new Set(["a", "b"]), "a");
    expect(result).toEqual(new Set(["b"]));
  });

  it("handles an empty set by adding the value", () => {
    expect(toggleSet(new Set(), "x")).toEqual(new Set(["x"]));
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// countValues
// ─────────────────────────────────────────────────────────────────────────────
describe("countValues", () => {
  it("counts occurrences per format", () => {
    const result = countValues(FIXTURES, "format");
    expect(result.get("PDF")).toBe(1);
    expect(result.get("Link")).toBe(1);
    expect(result.get("Zip")).toBe(1);
    expect(result.get("MP4")).toBe(1);
  });

  it("counts occurrences per area with duplicates", () => {
    const result = countValues(FIXTURES, "area");
    expect(result.get("Zdrowie")).toBe(2);
    expect(result.get("Finanse")).toBe(1);
    expect(result.get("Kariera")).toBe(1);
  });

  it("counts occurrences per event", () => {
    const result = countValues(FIXTURES, "event");
    expect(result.get("Warsztaty")).toBe(2);
    expect(result.get("Webinar")).toBe(1);
  });

  it("returns undefined for keys not present in the map", () => {
    const result = countValues(FIXTURES, "type");
    expect(result.get("Szablon")).toBeUndefined();
  });

  it("returns an empty map for empty input", () => {
    expect(countValues([], "format").size).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// filterAndSortMaterials
// ─────────────────────────────────────────────────────────────────────────────
const baseInput = {
  search: "",
  sort: "newest" as const,
  selectedEvent: "all",
  selectedTypes: new Set<string>(),
  selectedAreas: new Set<string>(),
  selectedFormats: new Set<string>(),
};

describe("filterAndSortMaterials", () => {
  describe("search", () => {
    it("returns all items when search is empty", () => {
      expect(filterAndSortMaterials({ ...baseInput, materials: FIXTURES })).toHaveLength(4);
    });

    it("filters by title (case-insensitive)", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        search: "przewodnik",
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Przewodnik");
    });

    it("filters by description", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        search: "opis infografiki",
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Infografika");
    });

    it("trims whitespace in search", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        search: "  Arkusz  ",
      });
      expect(result).toHaveLength(1);
    });

    it("returns empty array when no match", () => {
      expect(
        filterAndSortMaterials({ ...baseInput, materials: FIXTURES, search: "xyz_no_match" })
      ).toHaveLength(0);
    });
  });

  describe("sorting", () => {
    it("sorts newest first", () => {
      const result = filterAndSortMaterials({ ...baseInput, materials: FIXTURES, sort: "newest" });
      expect(result[0].date).toBe("2025-03-15");
      expect(result[result.length - 1].date).toBe("2024-08-20");
    });

    it("sorts oldest first", () => {
      const result = filterAndSortMaterials({ ...baseInput, materials: FIXTURES, sort: "oldest" });
      expect(result[0].date).toBe("2024-08-20");
      expect(result[result.length - 1].date).toBe("2025-03-15");
    });
  });

  describe("event filter", () => {
    it("returns all when selectedEvent is 'all'", () => {
      expect(
        filterAndSortMaterials({ ...baseInput, materials: FIXTURES, selectedEvent: "all" })
      ).toHaveLength(4);
    });

    it("filters to matching event only", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedEvent: "Webinar",
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Infografika");
    });

    it("returns multiple items sharing the same event", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedEvent: "Warsztaty",
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("type filter (multi-select)", () => {
    it("returns all when no types selected", () => {
      expect(filterAndSortMaterials({ ...baseInput, materials: FIXTURES })).toHaveLength(4);
    });

    it("filters to a single selected type", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedTypes: new Set(["Checklist"]),
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Arkusz");
    });

    it("filters to multiple selected types (OR logic)", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedTypes: new Set(["Checklist", "Infografika"]),
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("area filter (multi-select)", () => {
    it("filters by a single area", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedAreas: new Set(["Zdrowie"]),
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("format filter (multi-select)", () => {
    it("filters by a single format", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedFormats: new Set(["PDF"]),
      });
      expect(result).toHaveLength(1);
      expect(result[0].format).toBe("PDF");
    });

    it("filters by multiple formats (OR logic)", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedFormats: new Set(["PDF", "Zip"]),
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("date range filter", () => {
    it("filters items on or after dateFrom", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        dateFrom: new Date("2025-01-01"),
      });
      expect(result).toHaveLength(2);
      expect(result.every((m) => new Date(m.date) >= new Date("2025-01-01"))).toBe(true);
    });

    it("filters items on or before dateTo", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        dateTo: new Date("2024-12-31"),
      });
      expect(result).toHaveLength(2);
      expect(result.every((m) => new Date(m.date) <= new Date("2024-12-31"))).toBe(true);
    });

    it("applies both dateFrom and dateTo as a range", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        dateFrom: new Date("2024-11-01"),
        dateTo: new Date("2025-02-01"),
      });
      expect(result).toHaveLength(2);
      expect(result.map((m) => m.title).sort()).toEqual(["Arkusz", "Infografika"].sort());
    });

    it("returns empty when range excludes all items", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        dateFrom: new Date("2030-01-01"),
      });
      expect(result).toHaveLength(0);
    });
  });

  describe("combined filters", () => {
    it("applies search and format together", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        search: "przewodnik",
        selectedFormats: new Set(["PDF"]),
      });
      expect(result).toHaveLength(1);
    });

    it("returns empty when filters are too restrictive", () => {
      const result = filterAndSortMaterials({
        ...baseInput,
        materials: FIXTURES,
        selectedEvent: "Warsztaty",
        selectedFormats: new Set(["Zip"]),
      });
      expect(result).toHaveLength(0);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getActiveFilterCount
// ─────────────────────────────────────────────────────────────────────────────
const emptyCountArgs = {
  selectedEvent: "all",
  selectedTypes: new Set<string>(),
  selectedAreas: new Set<string>(),
  selectedFormats: new Set<string>(),
};

describe("getActiveFilterCount", () => {
  it("returns 0 when no filters are active", () => {
    expect(getActiveFilterCount(emptyCountArgs)).toBe(0);
  });

  it("counts a selected event as 1", () => {
    expect(getActiveFilterCount({ ...emptyCountArgs, selectedEvent: "Warsztaty" })).toBe(1);
  });

  it("counts each selected type individually", () => {
    expect(getActiveFilterCount({ ...emptyCountArgs, selectedTypes: new Set(["A", "B"]) })).toBe(2);
  });

  it("counts each selected area individually", () => {
    expect(getActiveFilterCount({ ...emptyCountArgs, selectedAreas: new Set(["Zdrowie"]) })).toBe(
      1
    );
  });

  it("counts each selected format individually", () => {
    expect(
      getActiveFilterCount({ ...emptyCountArgs, selectedFormats: new Set(["PDF", "Zip"]) })
    ).toBe(2);
  });

  it("counts dateFrom as 1 when set", () => {
    expect(getActiveFilterCount({ ...emptyCountArgs, dateFrom: new Date("2025-01-01") })).toBe(1);
  });

  it("counts dateTo as 1 when set", () => {
    expect(getActiveFilterCount({ ...emptyCountArgs, dateTo: new Date("2025-12-31") })).toBe(1);
  });

  it("sums all active filters correctly", () => {
    expect(
      getActiveFilterCount({
        selectedEvent: "Warsztaty",
        selectedTypes: new Set(["Poradnik", "Checklist"]),
        selectedAreas: new Set(["Zdrowie"]),
        selectedFormats: new Set(["PDF"]),
        dateFrom: new Date("2024-01-01"),
        dateTo: new Date("2025-12-31"),
      })
    ).toBe(7);
  });
});
