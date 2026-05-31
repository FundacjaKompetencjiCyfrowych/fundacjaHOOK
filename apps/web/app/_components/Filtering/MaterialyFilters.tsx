"use client";

import { useMemo, useState } from "react";

import MaterialySection from "@/app/_components/Sections/MaterialyPage/MaterialySection";
import { Collapsible } from "@/app/_components/ui/collapsible";

import MaterialyAdvancedFiltersPanel from "./MaterialyAdvancedFiltersPanel";
import MaterialyFiltersReset from "./MaterialyFiltersReset";
import MaterialyFiltersTopBar from "./MaterialyFiltersTopBar";
import { WYDARZENIA, type MaterialFilterItem } from "./materialyFilters.types";

import { filterAndSortMaterials, getActiveFilterCount, toggleSet } from "./materialyFilters.utils";

interface MaterialyFiltersProps {
  materials: MaterialFilterItem[];
  counts: {
    eventCount: Map<string, number>;
    typeCount: Map<string, number>;
    areaCount: Map<string, number>;
    formatCount: Map<string, number>;
  };
}

export default function MaterialyFilters({ materials, counts }: MaterialyFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [selEvent, setSelEvent] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selTypes, setSelTypes] = useState<Set<string>>(new Set());
  const [selAreas, setSelAreas] = useState<Set<string>>(new Set());
  const [selFormats, setSelFormats] = useState<Set<string>>(new Set());

  const eventCounts = counts.eventCount;
  const typeCounts = counts.typeCount;
  const areaCounts = counts.areaCount;
  const formatCounts = counts.formatCount;

  const filteredMaterials = useMemo(() => {
    return filterAndSortMaterials({
      materials,
      search,
      sort,
      selectedEvent: selEvent,
      selectedTypes: selTypes,
      selectedAreas: selAreas,
      selectedFormats: selFormats,
      dateFrom,
      dateTo,
    });
  }, [materials, search, sort, selEvent, selTypes, selAreas, selFormats, dateFrom, dateTo]);

  const activeFilterCount = useMemo(() => {
    return getActiveFilterCount({
      selectedEvent: selEvent,
      selectedTypes: selTypes,
      selectedAreas: selAreas,
      selectedFormats: selFormats,
      dateFrom,
      dateTo,
    });
  }, [selEvent, selTypes, selAreas, selFormats, dateFrom, dateTo]);

  const countForValue = (kind: "event" | "type" | "area" | "format", value: string) => {
    switch (kind) {
      case "event":
        return eventCounts.get(value) ?? 0;
      case "type":
        return typeCounts.get(value) ?? 0;
      case "area":
        return areaCounts.get(value) ?? 0;
      case "format":
        return formatCounts.get(value) ?? 0;
    }
  };

  const resetFilters = () => {
    setSort("newest");
    setSelEvent("all");
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelTypes(new Set());
    setSelAreas(new Set());
    setSelFormats(new Set());
  };

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <MaterialyFiltersTopBar
            search={search}
            filtersOpen={filtersOpen}
            activeFilterCount={activeFilterCount}
            onSearchChange={setSearch}
          />

          <MaterialyAdvancedFiltersPanel
            sort={sort}
            selectedEvent={selEvent}
            events={WYDARZENIA}
            dateFrom={dateFrom}
            dateTo={dateTo}
            selectedTypes={selTypes}
            selectedAreas={selAreas}
            selectedFormats={selFormats}
            countForValue={countForValue}
            onSortChange={setSort}
            onSelectedEventChange={setSelEvent}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onTypeToggle={(value) => setSelTypes((current) => toggleSet(current, value))}
            onAreaToggle={(value) => setSelAreas((current) => toggleSet(current, value))}
            onFormatToggle={(value) => setSelFormats((current) => toggleSet(current, value))}
          />
        </Collapsible>

        <MaterialyFiltersReset activeFilterCount={activeFilterCount} onReset={resetFilters} />

        <MaterialySection materials={filteredMaterials} />
      </div>
    </section>
  );
}
