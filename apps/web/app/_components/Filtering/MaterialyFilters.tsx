"use client";

import { useMemo, useState } from "react";

import MaterialySection from "@/app/_components/Sections/MaterialySection";
import { Collapsible } from "@/app/_components/ui/collapsible";

import MaterialyAdvancedFiltersPanel from "./MaterialyAdvancedFiltersPanel";
import MaterialyFiltersReset from "./MaterialyFiltersReset";
import MaterialyFiltersTopBar from "./MaterialyFiltersTopBar";
import { WYDARZENIA, type MaterialFilterItem } from "./materialyFilters.types";

import {
  countValues,
  filterAndSortMaterials,
  getActiveFilterCount,
  toggleSet,
} from "./materialyFilters.utils";

export default function MaterialyFilters({ materials }: { materials: MaterialFilterItem[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [selWydarzenie, setSelWydarzenie] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selTypy, setSelTypy] = useState<Set<string>>(new Set());
  const [selObszary, setSelObszary] = useState<Set<string>>(new Set());
  const [selFormaty, setSelFormaty] = useState<Set<string>>(new Set());

  const eventCounts = useMemo(() => countValues(materials, "event"), [materials]);
  const typeCounts = useMemo(() => countValues(materials, "type"), [materials]);
  const areaCounts = useMemo(() => countValues(materials, "area"), [materials]);
  const formatCounts = useMemo(() => countValues(materials, "format"), [materials]);

  const filteredMaterials = useMemo(() => {
    return filterAndSortMaterials({
      materials,
      search,
      sort,
      selectedEvent: selWydarzenie,
      selectedTypes: selTypy,
      selectedAreas: selObszary,
      selectedFormats: selFormaty,
      dateFrom,
      dateTo,
    });
  }, [materials, search, sort, selWydarzenie, selTypy, selObszary, selFormaty, dateFrom, dateTo]);

  const activeFilterCount = useMemo(() => {
    return getActiveFilterCount({
      selectedEvent: selWydarzenie,
      selectedTypes: selTypy,
      selectedAreas: selObszary,
      selectedFormats: selFormaty,
      dateFrom,
      dateTo,
    });
  }, [selWydarzenie, selTypy, selObszary, selFormaty, dateFrom, dateTo]);

  const countForValue = (kind: "event" | "type" | "area" | "format", value: string) => {
    const source =
      kind === "event"
        ? eventCounts
        : kind === "type"
          ? typeCounts
          : kind === "area"
            ? areaCounts
            : formatCounts;
    return source.get(value) ?? 0;
  };

  const resetFilters = () => {
    setSort("newest");
    setSelWydarzenie("all");
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelTypy(new Set());
    setSelObszary(new Set());
    setSelFormaty(new Set());
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
            selectedEvent={selWydarzenie}
            events={WYDARZENIA}
            dateFrom={dateFrom}
            dateTo={dateTo}
            selectedTypes={selTypy}
            selectedAreas={selObszary}
            selectedFormats={selFormaty}
            countForValue={countForValue}
            onSortChange={setSort}
            onSelectedEventChange={setSelWydarzenie}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onTypeToggle={(value) => setSelTypy((current) => toggleSet(current, value))}
            onAreaToggle={(value) => setSelObszary((current) => toggleSet(current, value))}
            onFormatToggle={(value) => setSelFormaty((current) => toggleSet(current, value))}
          />
        </Collapsible>

        <MaterialyFiltersReset activeFilterCount={activeFilterCount} onReset={resetFilters} />

        <MaterialySection materials={filteredMaterials} />
      </div>
    </section>
  );
}
