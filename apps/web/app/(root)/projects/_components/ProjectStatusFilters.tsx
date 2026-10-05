"use client";

import PROJECTS_STATUS, { type ProjectCounts, type ProjectFilter } from "../_constants/projects";
import { cn } from "@/lib/utils";

interface ProjectStatusFiltersProps {
  counts: ProjectCounts;
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
}

export default function ProjectStatusFilters({
  counts,
  activeFilter,
  onFilterChange,
}: ProjectStatusFiltersProps) {
  return (
    <div className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-full bg-[#f5f5f5] p-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      {PROJECTS_STATUS.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              {
                "bg-white font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)]":
                  isActive,
                "text-muted-foreground hover:text-foreground": !isActive,
              }
            )}
          >
            {filter.label}
            <span
              className={cn(
                "inline-flex justify-center items-center px-1.5 rounded-full min-w-5 h-5 text-[11px]",
                {
                  "bg-[#eae7e1] text-foreground": isActive,
                  "bg-[#e5e5e5] text-muted-foreground": !isActive,
                }
              )}
            >
              {counts[filter.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
