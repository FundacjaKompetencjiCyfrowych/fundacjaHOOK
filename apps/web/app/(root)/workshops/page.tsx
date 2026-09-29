import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import { sanityFetch } from "@/sanity/live";
import { WORKSHOPS_PAGE_SIZE, workshopsQuery } from "@/sanity/queries/workshops";
import { Workshop } from "@/sanity/typegen";
import WorkshopsPageClient from "./_components/WorkshopsPageClient";

const WorkshopsPage = async () => {
  const { data: workshops } = await sanityFetch({
    query: workshopsQuery,
    params: { start: 0, end: WORKSHOPS_PAGE_SIZE },
  });

  return (
    <>
      <Breadcrumbs segments={[{ label: "Warsztaty" }]} />
      <WorkshopsPageClient initialWorkshops={workshops as Workshop[]} />
    </>
  );
};

export default WorkshopsPage;
