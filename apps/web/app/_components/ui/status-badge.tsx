import { Badge } from "./badge";
import { mapStatus } from "@/lib/utils";

type Status = "inProgress" | "planned" | "completed";

interface StatusBadgeProps {
  status: Status | null | undefined;
  label?: string | null;
}

const STATUS_VARIANTS: Record<Status, "inProgress" | "planned" | "completed"> = {
  inProgress: "inProgress",
  planned: "planned",
  completed: "completed",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  if (!status) return null;

  return (
    <Badge
      variant={STATUS_VARIANTS[status]}
      className="h-auto rounded-[6px] px-2 py-0.5 font-medium text-xs tracking-[0.02em]"
    >
      {label ?? mapStatus(status)}
    </Badge>
  );
}
