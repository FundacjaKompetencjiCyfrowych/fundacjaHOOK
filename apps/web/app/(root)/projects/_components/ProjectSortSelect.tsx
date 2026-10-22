import { ChevronDownIcon } from "lucide-react";
import { PROJECT_SORT_ORDERS, type ProjectSortOrder } from "../_constants/projects";

interface ProjectSortSelectProps {
  sortBy: ProjectSortOrder;
  onSortChange: (sortBy: ProjectSortOrder) => void;
}

export default function ProjectSortSelect({ sortBy, onSortChange }: ProjectSortSelectProps) {
  return (
    <div className="inline-flex items-center gap-3 text-muted-foreground text-sm">
      <span>Sortuj:</span>
      <span className="relative inline-flex">
        <select
          aria-label="Sortuj projekty"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as ProjectSortOrder)}
          className="h-8 w-[7.5rem] appearance-none rounded-md border border-border bg-background py-0 pr-8 pl-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {PROJECT_SORT_ORDERS.map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-foreground"
        />
      </span>
    </div>
  );
}
