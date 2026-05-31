import MaterialyFilters from "@/app/_components/Filtering/MaterialyFilters";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { cacheLife } from "next/cache";
import { sanityFetch } from "@/sanity/live";
import { materialsQuery } from "@/sanity/queries/materials";
import { countValues } from "@/app/_components/Filtering/materialyFilters.utils";

async function getCachedMaterials() {
  "use cache";
  cacheLife("days");

  const { data } = await sanityFetch({ query: materialsQuery });
  const materials = mapMaterialsToFilterItems(data ?? []);

  return {
    materials,
    eventCount: countValues(materials, "event"),
    typeCount: countValues(materials, "type"),
    areaCount: countValues(materials, "area"),
    formatCount: countValues(materials, "format"),
  };
}

const MaterialsPage = async () => {
  const { materials, eventCount, typeCount, areaCount, formatCount } = await getCachedMaterials();

  return (
    <MaterialyFilters
      materials={materials}
      counts={{ eventCount, typeCount, areaCount, formatCount }}
    />
  );
};

export default MaterialsPage;
