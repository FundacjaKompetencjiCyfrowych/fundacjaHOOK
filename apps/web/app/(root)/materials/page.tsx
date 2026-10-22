import type { Metadata } from "next";
import ROUTES from "@/constants/routes";
import { getSeoMetadata } from "@/sanity/metadata/getSeoMetadata";
import MaterialsFilters from "./_components/MaterialsFilters";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { mapMaterialsToFilterItems } from "@/lib/mappers/materials";
import { cacheLife } from "next/cache";
import { sanityFetch } from "@/sanity/live";
import {
  MATERIALS_PAGE_SIZE,
  materialsFacetsQuery,
  materialsNewestPageQuery,
} from "@/sanity/queries/materials";
import { countValues } from "./_lib/materialsFilters.helpers";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata({ pathname: ROUTES.MATERIALS });
}

async function getCachedMaterialsPageData(pageSize: number) {
  "use cache";
  cacheLife("days");

  const [{ data }, { data: initialData }] = await Promise.all([
    sanityFetch({ query: materialsFacetsQuery }),
    sanityFetch({
      query: materialsNewestPageQuery,
      params: {
        search: "",
        event: "all",
        types: [],
        areas: [],
        formats: [],
        dateFrom: null,
        dateTo: null,
        start: 0,
        end: pageSize,
      },
    }),
  ]);
  const materials = mapMaterialsToFilterItems(data ?? []);

  return {
    initialMaterials: mapMaterialsToFilterItems(initialData),
    eventCount: countValues(materials, "event"),
    typeCount: countValues(materials, "type"),
    areaCount: countValues(materials, "area"),
    formatCount: countValues(materials, "format"),
  };
}

const MaterialsPage = async () => {
  const { initialMaterials, eventCount, typeCount, areaCount, formatCount } =
    await getCachedMaterialsPageData(MATERIALS_PAGE_SIZE);

  return (
    <>
      <Breadcrumbs segments={[{ label: "Materiały" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>Materiały</PageTitle>
          <MaterialsFilters
            initialMaterials={initialMaterials}
            counts={{ eventCount, typeCount, areaCount, formatCount }}
          />
        </div>
      </section>
    </>
  );
};

export default MaterialsPage;
