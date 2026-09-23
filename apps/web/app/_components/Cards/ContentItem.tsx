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
  const downloadUrl = `${material.fileUrl}${material.fileUrl.includes("?") ? "&" : "?"}dl=`;

  return (
    <article className="flex items-center gap-3 bg-elevated shadow-sm p-3 border border-subtle rounded-lg">
      <WirePlaceholder label={material.format} />
      <div className="flex md:flex-row flex-1 flex-col md:justify-between md:items-center gap-3 min-w-0">
        <div className="min-w-0">
          <p className="font-bold text-main text-sm leading-5">{material.title}</p>
          <p className="text-muted text-xs leading-4">{material.description}</p>
        </div>

        <div className="flex items-center gap-3 text-muted shrink-0">
          <span className="text-xs whitespace-nowrap">
            {material.size} · {formatDate(material.date)}
          </span>
          <a
            href={material.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Podgląd"
            title="Podgląd"
            className="inline-flex justify-center items-center hover:bg-sunken rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-9 h-9 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </a>
          <a
            href={downloadUrl}
            aria-label="Pobierz"
            title="Pobierz"
            className="inline-flex justify-center items-center hover:bg-sunken rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-9 h-9 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
