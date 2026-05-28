"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarIcon, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

import MaterialySection from "@/app/_components/Sections/MaterialySection";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/lib/utils";

import {
  countValues,
  filterAndSortMaterials,
  getActiveFilterCount,
  type MaterialFilterItem,
  toggleSet,
} from "./materialyFilters.utils";

const TYPY = [
  "Workbook",
  "Checklist",
  "Poradnik",
  "Publikacja",
  "Nagranie video",
  "Szablon",
  "Infografika",
];
const OBSZARY = ["Zdrowie", "Prawo", "Finanse", "Kariera", "Rozwój osobisty", "Rodzicielstwo"];
const FORMATY = ["PDF", "ZIP", "MP4", "Link"];

export default function MaterialyFilters({ materials }: { materials: MaterialFilterItem[] }) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [selWydarzenie, setSelWydarzenie] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selTypy, setSelTypy] = useState<Set<string>>(new Set());
  const [selObszary, setSelObszary] = useState<Set<string>>(new Set());
  const [selFormaty, setSelFormaty] = useState<Set<string>>(new Set());

  const WYDARZENIA = useMemo(() => {
    return Array.from(new Set(materials.map((material) => material.event))).sort((a, b) =>
      a.localeCompare(b, "pl")
    );
  }, [materials]);

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
          <div className="flex sm:flex-row flex-col gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
              <Input
                placeholder="Szukaj materiałów..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="bg-elevated pl-9 border-subtle rounded-xl h-11"
              />
            </div>

            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="justify-between gap-2 bg-elevated border-subtle rounded-xl w-full sm:w-[200px] h-11"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Więcej filtrów
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="default"
                      className="ml-1 px-1.5 rounded-full min-w-[20px] h-5 text-xs"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </span>
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")}
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          {activeFilterCount > 0 && (
            <div className="mb-4">
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                Wyczyść filtry
              </button>
            </div>
          )}

          <CollapsibleContent>
            <div className="items-start gap-x-6 gap-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-neutral-100 mb-6 p-4 rounded-2xl">
              <div>
                <p className="mb-2 font-bold text-sm">Sortowanie</p>
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as "newest" | "oldest")}
                >
                  <SelectTrigger className="bg-elevated w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Od najnowszych</SelectItem>
                    <SelectItem value="oldest">Od najstarszych</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-2 font-bold text-sm">Wydarzenie</p>
                <Select value={selWydarzenie} onValueChange={setSelWydarzenie}>
                  <SelectTrigger className="bg-elevated w-full">
                    <SelectValue placeholder="Wszystkie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    {WYDARZENIA.map((wydarzenie) => (
                      <SelectItem key={wydarzenie} value={wydarzenie}>
                        {wydarzenie} ({countForValue("event", wydarzenie)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-2 font-bold text-sm">Data publikacji</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start bg-elevated border-subtle w-[160px] h-10 font-normal text-left",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Od"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        locale={pl}
                      />
                    </PopoverContent>
                  </Popover>

                  <span className="text-muted-foreground text-sm">-</span>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start bg-elevated border-subtle w-[160px] h-10 font-normal text-left",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {dateTo ? format(dateTo, "dd.MM.yyyy") : "Do"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} locale={pl} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <p className="mb-2 font-bold text-sm">Typ materiału</p>
                <div className="space-y-1.5">
                  {TYPY.map((typ) => (
                    <div key={typ} className="flex items-center gap-2">
                      <Checkbox
                        id={`typ-${typ}`}
                        checked={selTypy.has(typ)}
                        onCheckedChange={() => setSelTypy((current) => toggleSet(current, typ))}
                      />
                      <Label htmlFor={`typ-${typ}`} className="font-normal text-sm cursor-pointer">
                        {typ}
                        <span className="ml-1 text-muted-foreground">
                          ({countForValue("type", typ)})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-bold text-sm">Obszar tematyczny</p>
                <div className="space-y-1.5">
                  {OBSZARY.map((obszar) => (
                    <div key={obszar} className="flex items-center gap-2">
                      <Checkbox
                        id={`obszar-${obszar}`}
                        checked={selObszary.has(obszar)}
                        onCheckedChange={() =>
                          setSelObszary((current) => toggleSet(current, obszar))
                        }
                      />
                      <Label
                        htmlFor={`obszar-${obszar}`}
                        className="font-normal text-sm cursor-pointer"
                      >
                        {obszar}
                        <span className="ml-1 text-muted-foreground">
                          ({countForValue("area", obszar)})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-bold text-sm">Format</p>
                <div className="space-y-1.5">
                  {FORMATY.map((formatValue) => (
                    <div key={formatValue} className="flex items-center gap-2">
                      <Checkbox
                        id={`format-${formatValue}`}
                        checked={selFormaty.has(formatValue)}
                        onCheckedChange={() =>
                          setSelFormaty((current) => toggleSet(current, formatValue))
                        }
                      />
                      <Label
                        htmlFor={`format-${formatValue}`}
                        className="font-normal text-sm cursor-pointer"
                      >
                        {formatValue}
                        <span className="ml-1 text-muted-foreground">
                          ({countForValue("format", formatValue)})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <MaterialySection materials={filteredMaterials} />
      </div>
    </section>
  );
}
