import { PROJECT_SORT_ORDERS, type ProjectSortOrder } from "../_constants/projects";

interface ProjectSortSelectProps {
  sortBy: ProjectSortOrder;
  onSortChange: (sortBy: ProjectSortOrder) => void;
}

export default function ProjectSortSelect({ sortBy, onSortChange }: ProjectSortSelectProps) {
  return (
    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
      <span>Sortuj:</span>
      <select
        aria-label="Sortuj projekty"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as ProjectSortOrder)}
        className="h-8 rounded-md border border-border bg-background px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {PROJECT_SORT_ORDERS.map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
    </div>
  );
}
