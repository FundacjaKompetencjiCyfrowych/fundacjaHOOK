"use client";

import PROJECTS_STATUS from "@/lib/constants/projects";
import { useState } from "react";

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
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active
                ? "bg-background text-foreground font-medium shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            <span
              className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] ${
                active ? "bg-muted text-foreground" : "bg-neutral-200 text-muted-foreground"
              }`}
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
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active
                  ? "bg-background text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] ${
                  active ? "bg-muted text-foreground" : "bg-neutral-200 text-muted-foreground"
                }`}
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
