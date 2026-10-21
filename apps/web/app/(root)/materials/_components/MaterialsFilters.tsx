"use client";

import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";

import MaterialResourceList from "@/app/_components/Materials/MaterialResourceList";
import { Collapsible } from "@/app/_components/ui/collapsible";
import LoadMoreButton from "@/app/_components/Buttons/LoadMoreButton";
import { usePaginatedItems } from "@/lib/hooks/usePaginatedItems";
import { MATERIALS_PAGE_SIZE } from "@/sanity/queries/materials";

import AdvancedMaterialsFiltersPanel from "./AdvancedMaterialsFiltersPanel";
import MaterialsFiltersReset from "./MaterialsFiltersReset";
import MaterialsFiltersTopBar from "./MaterialsFiltersTopBar";
import { EVENTS } from "../_lib/materialsFilters.constants";
import type { MaterialFilterItem } from "@/lib/types/materials";
import { loadMaterialsPage } from "../_actions/loadMaterialsPage";
import type { MaterialsPageFilters } from "../_lib/materialsFilters.types";

import { getActiveFilterCount, toggleSet } from "../_lib/materialsFilters.helpers";

interface MaterialsFiltersProps {
  initialMaterials: MaterialFilterItem[];
  counts: {
    eventCount: Map<string, number>;
    typeCount: Map<string, number>;
    areaCount: Map<string, number>;
    formatCount: Map<string, number>;
  };
}

export default function MaterialsFilters({ initialMaterials, counts }: MaterialsFiltersProps) {
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

  const filters = useMemo<MaterialsPageFilters>(
    () => ({
      search,
      sort,
      event: selEvent,
      types: [...selTypes].sort(),
      areas: [...selAreas].sort(),
      formats: [...selFormats].sort(),
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
    }),
    [search, sort, selEvent, selTypes, selAreas, selFormats, dateFrom, dateTo]
  );
  const resetKey = JSON.stringify(filters);
  const loadFilteredMaterials = useCallback(
    (start: number, limit: number) => loadMaterialsPage(start, filters, limit),
    [filters]
  );
  const pagination = usePaginatedItems({
    initialItems: initialMaterials,
    pageSize: MATERIALS_PAGE_SIZE,
    loadItemsAction: loadFilteredMaterials,
    resetKey,
  });

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
    <section className="mt-6">
      <div className="w-full">
        <MaterialsFiltersReset activeFilterCount={activeFilterCount} onReset={resetFilters} />

        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <MaterialsFiltersTopBar
            search={search}
            filtersOpen={filtersOpen}
            activeFilterCount={activeFilterCount}
            onSearchChange={setSearch}
          />

          <AdvancedMaterialsFiltersPanel
            sort={sort}
            selectedEvent={selEvent}
            events={EVENTS}
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

        <h2 className="mb-2 text-base font-medium leading-5 text-main">Baza wiedzy</h2>
        <MaterialResourceList materials={pagination.items} />
        <LoadMoreButton pagination={pagination} />
      </div>
    </section>
  );
}
