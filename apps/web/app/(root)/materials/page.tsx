import MaterialyFilters from "@/app/_components/Filtering/MaterialyFilters";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
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
    <>
      <Breadcrumbs segments={[{ label: "Materiały" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>Materiały</PageTitle>
          <MaterialyFilters
            materials={materials}
            counts={{ eventCount, typeCount, areaCount, formatCount }}
          />
        </div>
      </section>
    </>
  );
};

export default MaterialsPage;
