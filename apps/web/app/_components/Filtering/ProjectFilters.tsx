"use client";

import PROJECTS_STATUS from "@/lib/constants/projects";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  counts: Record<string, number>;
  filter: string;
  setFilter: (filter: string) => void;
}

export default function ProjectFilters({ counts, filter, setFilter }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 bg-neutral-100 shadow-sm p-1 rounded-2xl sm:rounded-full">
      {PROJECTS_STATUS.slice(0, 2).map((f) => {
        const active = filter === f.value;
        return (
          <button
            key={f.value}
            type="button"
            onClick={() => {
              setFilter(f.value);
            }}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm transition-colors",
              {
                "bg-muted text-foreground": active,
                "bg-neutral-200 text-muted-foreground": !active,
              }
            )}
          >
            {f.label}
            <span
              className={cn(
                "inline-flex justify-center items-center px-1.5 rounded-full min-w-5 h-5 text-[11px]",
                {
                  "bg-muted text-foreground": active,
                  "bg-neutral-200 text-muted-foreground": !active,
                }
              )}
            >
              {counts[f.value]}
            </span>
          </button>
        );
      })}
      <div className="flex items-center gap-1">
        {PROJECTS_STATUS.slice(2).map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setFilter(f.value);
              }}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm transition-colors",
                {
                  "bg-background text-foreground font-medium shadow-sm": active,
                  "text-muted-foreground hover:text-foreground": !active,
                }
              )}
            >
              {f.label}
              <span
                className={cn(
                  "inline-flex justify-center items-center px-1.5 rounded-full min-w-5 h-5 text-[11px]",
                  {
                    "bg-muted text-foreground": active,
                    "bg-neutral-200 text-muted-foreground": !active,
                  }
                )}
              >
                {counts[f.value]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
