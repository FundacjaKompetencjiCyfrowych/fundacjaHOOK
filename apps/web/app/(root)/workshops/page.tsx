import WorkshopCard from "@/app/_components/Cards/WorkshopCard";
import Breadcrumbs from "@/app/_components/Navigation/Breadcrumbs";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

const workshopsQuery = defineQuery(`
  *[_type == "workshop"] | order(_createdAt desc)`);

const WorkshopsPage = async () => {
  const { data: workshops } = await sanityFetch({
    query: workshopsQuery,
  });

  return (
    <>
      <Breadcrumbs segments={[{ label: "Warsztaty" }]} />
      <section className="px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          <PageTitle>Warsztaty</PageTitle>
          <div className="mt-6">
            <div className="gap-4 grid lg:grid-cols-2">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop._id} workshop={workshop} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkshopsPage;
