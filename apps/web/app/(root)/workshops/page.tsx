import WorkshopCard from "@/app/_components/Cards/WorkshopCard";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import { Separator } from "@/app/_components/ui/separator";

const workshopsQuery = defineQuery(`
  *[_type == "workshop"] | order(_createdAt desc)`);

const WorkshopsPage = async () => {
  const { data: workshops } = await sanityFetch({
    query: workshopsQuery,
  });

  return (
    <main>
      <div className="mx-auto mb-12 px-6 max-w-300">
        <h1 className="mb-6 font-bold text-[24px]">Warsztaty</h1>
        <div className="gap-4 grid lg:grid-cols-2">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
      </div>

      <Separator className="hidden md:block bg-[#D1C9BD] mb-21.25" />
    </main>
  );
};

export default WorkshopsPage;
