"use client";

import LoadMoreButton from "@/app/_components/Buttons/LoadMoreButton";
import WorkshopCard from "@/app/_components/Cards/WorkshopCard";
import PageTitle from "@/app/_components/Navigation/PageTitle";
import { usePaginatedItems } from "@/lib/hooks/usePaginatedItems";
import { WORKSHOPS_PAGE_SIZE } from "@/sanity/queries/workshops";
import type { Workshop } from "@/sanity/typegen";
import { loadWorkshopsPage } from "../_actions/loadWorkshopsPage";

interface WorkshopsPageClientProps {
  initialWorkshops: Workshop[];
}

export default function WorkshopsPageClient({ initialWorkshops }: WorkshopsPageClientProps) {
  const pagination = usePaginatedItems({
    initialItems: initialWorkshops,
    pageSize: WORKSHOPS_PAGE_SIZE,
    loadItemsAction: loadWorkshopsPage,
  });

  return (
    <section className="px-4 py-12 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <PageTitle>Warsztaty</PageTitle>
        <div className="mt-6">
          <div className="gap-4 grid lg:grid-cols-2">
            {pagination.items.map((workshop) => (
              <WorkshopCard key={workshop._id} workshop={workshop} />
            ))}
          </div>
          <LoadMoreButton pagination={pagination} />
        </div>
      </div>
    </section>
  );
}
