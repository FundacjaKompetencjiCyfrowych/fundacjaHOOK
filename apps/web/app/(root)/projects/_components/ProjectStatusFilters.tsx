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
    <div className="flex flex-wrap items-center gap-1 bg-neutral-100 shadow-sm p-1 rounded-2xl sm:rounded-full">
      {PROJECTS_STATUS.slice(0, 2).map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm transition-colors",
              {
                "bg-muted text-foreground": isActive,
                "bg-neutral-200 text-muted-foreground": !isActive,
              }
            )}
          >
            {filter.label}
            <span
              className={cn(
                "inline-flex justify-center items-center px-1.5 rounded-full min-w-5 h-5 text-[11px]",
                {
                  "bg-muted text-foreground": isActive,
                  "bg-neutral-200 text-muted-foreground": !isActive,
                }
              )}
            >
              {counts[filter.value]}
            </span>
          </button>
        );
      })}
      <div className="flex items-center gap-1">
        {PROJECTS_STATUS.slice(2).map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm transition-colors",
                {
                  "bg-background text-foreground font-medium shadow-sm": isActive,
                  "text-muted-foreground hover:text-foreground": !isActive,
                }
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "inline-flex justify-center items-center px-1.5 rounded-full min-w-5 h-5 text-[11px]",
                  {
                    "bg-muted text-foreground": isActive,
                    "bg-neutral-200 text-muted-foreground": !isActive,
                  }
                )}
              >
                {counts[filter.value]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
