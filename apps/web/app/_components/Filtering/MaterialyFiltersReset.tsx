import { X } from "lucide-react";

type MaterialyFiltersResetProps = {
  activeFilterCount: number;
  onReset: () => void;
};

export default function MaterialyFiltersReset({
  activeFilterCount,
  onReset,
}: MaterialyFiltersResetProps) {
  if (activeFilterCount === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer"
      >
        <X className="w-3 h-3" />
        Wyczyść filtry
      </button>
    </div>
  );
}
