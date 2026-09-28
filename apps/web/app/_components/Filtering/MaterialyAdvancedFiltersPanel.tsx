import { useState } from "react";

import { formatDatePolish } from "@/lib/formatDate";
import { pl } from "date-fns/locale/pl";
import { CalendarIcon, Check, ChevronDown } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { CollapsibleContent } from "@/app/_components/ui/collapsible";
import { Label } from "@/app/_components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import { cn } from "@/lib/utils";

import { FORMATY, OBSZARY, TYPY } from "./materialyFilters.types";

type FilterOption = { label: string; value: string };

function FilterDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-elevated hover:bg-elevated border-subtle hover:border-brand-primary text-foreground hover:text-foreground aria-expanded:border-subtle aria-expanded:hover:border-brand-primary aria-expanded:hover:bg-elevated w-full font-normal text-left focus-visible:ring-brand-focus"
        >
          {selectedOption?.label}
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 w-[var(--radix-popover-trigger-width)]">
        <div role="listbox">
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant="ghost"
              role="option"
              aria-selected={option.value === value}
              className="justify-between w-full font-normal"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
              {option.value === value && <Check className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type MaterialyAdvancedFiltersPanelProps = {
  sort: "newest" | "oldest";
  selectedEvent: string;
  events: readonly string[];
  dateFrom?: Date;
  dateTo?: Date;
  selectedTypes: Set<string>;
  selectedAreas: Set<string>;
  selectedFormats: Set<string>;
  countForValue: (kind: "event" | "type" | "area" | "format", value: string) => number;
  onSortChange: (value: "newest" | "oldest") => void;
  onSelectedEventChange: (value: string) => void;
  onDateFromChange: (value: Date | undefined) => void;
  onDateToChange: (value: Date | undefined) => void;
  onTypeToggle: (value: string) => void;
  onAreaToggle: (value: string) => void;
  onFormatToggle: (value: string) => void;
};

export default function MaterialyAdvancedFiltersPanel({
  sort,
  selectedEvent,
  events,
  dateFrom,
  dateTo,
  selectedTypes,
  selectedAreas,
  selectedFormats,
  countForValue,
  onSortChange,
  onSelectedEventChange,
  onDateFromChange,
  onDateToChange,
  onTypeToggle,
  onAreaToggle,
  onFormatToggle,
}: MaterialyAdvancedFiltersPanelProps) {
  return (
    <CollapsibleContent>
      <div className="items-start gap-x-6 gap-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-neutral-100 mb-6 p-4 rounded-2xl">
        <div>
          <p className="mb-2 font-bold text-sm">Sortowanie</p>
          <FilterDropdown
            value={sort}
            options={[
              { value: "newest", label: "Od najnowszych" },
              { value: "oldest", label: "Od najstarszych" },
            ]}
            onChange={(value) => onSortChange(value as "newest" | "oldest")}
          />
        </div>

        <div>
          <p className="mb-2 font-bold text-sm">Wydarzenie</p>
          <FilterDropdown
            value={selectedEvent}
            options={[
              { value: "all", label: "Wszystkie" },
              ...events.map((eventValue) => ({
                value: eventValue,
                label: `${eventValue} (${countForValue("event", eventValue)})`,
              })),
            ]}
            onChange={onSelectedEventChange}
          />
        </div>

        <div>
          <p className="mb-2 font-bold text-sm">Data publikacji</p>
          <div className="flex flex-wrap items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={cn(
                    "justify-start bg-elevated border-subtle w-[160px] h-10 font-normal text-left",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 w-4 h-4" />
                  {dateFrom ? formatDatePolish(dateFrom) : "Od"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={onDateFromChange}
                  locale={pl}
                />
              </PopoverContent>
            </Popover>

            <span className="text-muted-foreground text-sm">-</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={cn(
                    "justify-start bg-elevated border-subtle w-[160px] h-10 font-normal text-left",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 w-4 h-4" />
                  {dateTo ? formatDatePolish(dateTo) : "Do"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar mode="single" selected={dateTo} onSelect={onDateToChange} locale={pl} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <p className="mb-2 font-bold text-sm">Typ materiału</p>
          <div className="space-y-1.5">
            {TYPY.map((typeValue) => (
              <div key={typeValue} className="flex items-center gap-2">
                <Checkbox
                  id={`typ-${typeValue}`}
                  checked={selectedTypes.has(typeValue)}
                  onCheckedChange={() => onTypeToggle(typeValue)}
                />
                <Label htmlFor={`typ-${typeValue}`} className="font-normal text-sm cursor-pointer">
                  {typeValue}
                  <span className="ml-1 text-muted-foreground">
                    ({countForValue("type", typeValue)})
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-bold text-sm">Obszar tematyczny</p>
          <div className="space-y-1.5">
            {OBSZARY.map((areaValue) => (
              <div key={areaValue} className="flex items-center gap-2">
                <Checkbox
                  id={`obszar-${areaValue}`}
                  checked={selectedAreas.has(areaValue)}
                  onCheckedChange={() => onAreaToggle(areaValue)}
                />
                <Label
                  htmlFor={`obszar-${areaValue}`}
                  className="font-normal text-sm cursor-pointer"
                >
                  {areaValue}
                  <span className="ml-1 text-muted-foreground">
                    ({countForValue("area", areaValue)})
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
                  checked={selectedFormats.has(formatValue)}
                  onCheckedChange={() => onFormatToggle(formatValue)}
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
  );
}
