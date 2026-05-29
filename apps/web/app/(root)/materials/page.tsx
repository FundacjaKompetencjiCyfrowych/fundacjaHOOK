import MaterialyFilters from "@/app/_components/Filtering/MaterialyFilters";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { cacheLife } from "next/cache";
import { sanityFetch } from "@/sanity/live";
import { materialsQuery } from "@/sanity/queries/materials";

async function getCachedMaterials() {
  "use cache";
  cacheLife("days");

  const { data } = await sanityFetch({ query: materialsQuery });
  return mapMaterialsToFilterItems(data ?? []);
}

const MaterialsPage = async () => {
  const materials = await getCachedMaterials();

  return <MaterialyFilters materials={materials} />;
};

export default MaterialsPage;
