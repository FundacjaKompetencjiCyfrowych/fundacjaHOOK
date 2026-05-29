import type { MaterialPlacement } from "@/lib/constants/materialPlacements";
import type { MaterialQueryItem } from "@/lib/mappers/materials";

export function getMaterialsByPlacement(
  materials: MaterialQueryItem[] | null | undefined,
  placement: MaterialPlacement
) {
  if (!materials) return [];

  return materials.filter((material) => {
    const placements = material.placements ?? [];
    return placements.includes(placement);
  });
}
