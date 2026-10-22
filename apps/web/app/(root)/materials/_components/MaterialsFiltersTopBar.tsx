import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { CollapsibleTrigger } from "@/app/_components/ui/collapsible";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";

type MaterialsFiltersTopBarProps = {
  search: string;
  filtersOpen: boolean;
  activeFilterCount: number;
  onSearchChange: (value: string) => void;
};

export default function MaterialsFiltersTopBar({
  search,
  filtersOpen,
  activeFilterCount,
  onSearchChange,
}: MaterialsFiltersTopBarProps) {
  return (
    <div className="flex sm:flex-row flex-col gap-3 mb-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888]" />
        <Input
          placeholder="Szukaj materiałów"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-[42px] rounded-[13px] border-[#bdbdbd] bg-white pl-10 pr-3 text-base placeholder:text-[#aaa] hover:border-[#aaa] focus-visible:ring-1 focus-visible:ring-gray-300"
        />
      </div>

      <CollapsibleTrigger asChild>
        <Button
          variant="secondary"
          className="h-[42px] w-full justify-between gap-2 rounded-[13px] border-[#bdbdbd] bg-white px-4 text-sm text-[#222] hover:border-[#aaa] hover:bg-white hover:text-[#222] aria-expanded:bg-white aria-expanded:hover:bg-white sm:w-[200px] cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
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
            className={cn("w-3.5 h-3.5 transition-transform", filtersOpen && "rotate-180")}
          />
        </Button>
      </CollapsibleTrigger>
    </div>
  );
}
