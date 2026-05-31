import { Download, Eye } from "lucide-react";

import { formatDate } from "@/lib/formatDate";
import WirePlaceholder from "../WirePlaceholder";

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
    <article className="bg-elevated shadow-sm hover:shadow-md p-3 border border-subtle rounded-xl transition-shadow duration-200">
      <div className="flex sm:flex-row flex-col sm:items-center gap-3">
        <div className="flex flex-1 items-start gap-3 min-w-0">
          <WirePlaceholder label={material.format} />
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-6">
              <span className="font-bold text-main">{material.title}</span>
              <span className="text-muted"> / {formatDate(material.date)}</span>
            </p>
            <p className="text-muted text-xs leading-5">{material.description}</p>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end items-center gap-3 pl-0 sm:pl-3">
          <a
            href={material.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Podgląd"
            title="Podgląd"
            className="inline-flex justify-center items-center hover:bg-sunken rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-9 h-9 transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
          </a>
          <div className="flex sm:flex-col items-center gap-2 sm:gap-0 shrink-0">
            <a
              href={material.fileUrl}
              download
              aria-label="Pobierz"
              title="Pobierz"
              className="inline-flex justify-center items-center hover:bg-sunken rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-9 h-9 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
            <span className="text-muted text-xs whitespace-nowrap">{material.size}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
