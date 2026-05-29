import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { CollapsibleTrigger } from "@/app/_components/ui/collapsible";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";

type MaterialyFiltersTopBarProps = {
  search: string;
  filtersOpen: boolean;
  activeFilterCount: number;
  onSearchChange: (value: string) => void;
};

export default function MaterialyFiltersTopBar({
  search,
  filtersOpen,
  activeFilterCount,
  onSearchChange,
}: MaterialyFiltersTopBarProps) {
  return (
    <div className="flex sm:flex-row flex-col gap-3 mb-3">
      <div className="relative flex-1">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
        <Input
          placeholder="Szukaj materiałów..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="bg-elevated pl-9 border-subtle rounded-xl h-11"
        />
      </div>

      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="justify-between gap-2 bg-elevated aria-expanded:bg-elevated aria-expanded:hover:bg-muted border-subtle rounded-xl w-full sm:w-[200px] h-11 cursor-pointer"
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
  );
}
