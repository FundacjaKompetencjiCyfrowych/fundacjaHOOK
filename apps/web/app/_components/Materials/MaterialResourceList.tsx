import MaterialResourceCard from "@/app/_components/Materials/MaterialResourceCard";
import type { MaterialResource } from "@/lib/types/materials";

export default function MaterialResourceList({ materials }: { materials: MaterialResource[] }) {
  return (
    <div className="space-y-3">
      {materials.map((material) => (
        <MaterialResourceCard key={`${material.title}-${material.date}`} material={material} />
      ))}
    </div>
  );
}
