import { PROJECT_SORT_ORDERS, type ProjectSortOrder } from "../_constants/projects";

interface ProjectSortSelectProps {
  sortBy: ProjectSortOrder;
  onSortChange: (sortBy: ProjectSortOrder) => void;
}

export default function ProjectSortSelect({ sortBy, onSortChange }: ProjectSortSelectProps) {
  return (
    <label className="inline-flex items-center gap-2 text-muted-foreground text-sm">
      Sortuj:
      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as ProjectSortOrder)}
        className="bg-background px-2 py-1 border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground text-sm"
      >
        {PROJECT_SORT_ORDERS.map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
    </label>
  );
}
