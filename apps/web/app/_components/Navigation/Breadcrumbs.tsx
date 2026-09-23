import Link from "next/link";

import ROUTES from "@/constants/routes";

export type BreadcrumbSegment = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ segments }: { segments: BreadcrumbSegment[] }) {
  const allSegments = [{ label: "Strona główna", href: ROUTES.HOME }, ...segments];

  return (
    <nav aria-label="Okruszki" className="mx-auto max-w-[1200px] px-4 md:px-6 py-2">
      <ol className="flex items-center gap-1 text-muted text-xs">
        {allSegments.map((segment, index) => (
          <li key={`${segment.label}-${segment.href ?? index}`} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">›</span>}
            {segment.href ? (
              <Link href={segment.href}>{segment.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-main">
                {segment.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
