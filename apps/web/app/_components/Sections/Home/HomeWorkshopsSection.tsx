import Link from "next/link";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import WorkshopCard from "../../Cards/WorkshopCard";
import type { Workshop } from "@/sanity/typegen";

export function HomeWorkshopsSection({
  title,
  subtitle,
  items = [],
}: {
  title?: string;
  subtitle?: string;
  items?: Workshop[];
} = {}) {
  if (!items.length) return null;

  return (
    <section className="px-4 py-[38px] sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <Typography
          as="h2"
          variant="h4"
          weight="bold"
          className="text-[22px] leading-[1.1] tracking-[0.01em]"
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body" className="mt-2 text-muted">
            {subtitle}
          </Typography>
        ) : null}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((workshop) => (
            <WorkshopCard key={workshop._id} workshop={workshop} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/workshops">Pokaż wszystkie</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
