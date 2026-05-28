import { Download, Eye } from "lucide-react";

import { formatDate } from "@/lib/formatDate";
import WirePlaceholder from "./WirePlaceholder";

export type ContentItemType = {
  title: string;
  date: string;
  description: string;
  fileUrl: string;
  format: string;
  size: string;
  event?: string;
  type?: string;
  area?: string;
};

export default function ContentItem({ material }: { material: ContentItemType }) {
  return (
    <article className="rounded-xl border border-subtle bg-elevated p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <WirePlaceholder label={material.format} />
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-6">
              <span className="font-bold text-main">{material.title}</span>
              <span className="text-muted"> / {formatDate(material.date)}</span>
            </p>
            <p className="text-xs leading-5 text-muted">{material.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pl-0 sm:justify-end sm:pl-3">
          <a
            href={material.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Podgląd"
            title="Podgląd"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Eye className="h-4 w-4" />
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:gap-0">
            <a
              href={material.fileUrl}
              download
              aria-label="Pobierz"
              title="Pobierz"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" />
            </a>
            <span className="whitespace-nowrap text-xs text-muted">{material.size}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
