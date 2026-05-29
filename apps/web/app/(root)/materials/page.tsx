import MaterialyFilters from "@/app/_components/Filtering/MaterialyFilters";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { sanityFetch } from "@/sanity/live";
import { materialsQuery } from "@/sanity/queries/materials";

const MaterialsPage = async () => {
  const { data } = await sanityFetch({ query: materialsQuery });
  const materials = mapMaterialsToFilterItems(data ?? []);

  return <MaterialyFilters materials={materials} />;
};

export default MaterialsPage;
