import { Download, ExternalLink, Eye } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { getDownloadUrl } from "@/lib/getDownloadUrl";
import type { MaterialResource } from "@/lib/types/materials";
import WirePlaceholder from "../WirePlaceholder";

function isHttpUrl(value: string | null | undefined): value is string {
  if (!value || !/^https?:\/\//i.test(value)) return false;

  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export default function MaterialResourceCard({ material }: { material: MaterialResource }) {
  const isLink = material.format === "Link";
  const linkUrl = isHttpUrl(material.linkUrl) ? material.linkUrl : null;
  const fileUrl = isHttpUrl(material.fileUrl) ? material.fileUrl : null;

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
            {!isLink && `${material.size} · `}
            {formatDate(material.date)}
          </span>
          {isLink ? (
            linkUrl ? (
              <Button asChild variant="ghost" size="icon-lg">
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Otwórz link"
                  title="Otwórz link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            ) : (
              <span className="text-xs">Link niedostępny</span>
            )
          ) : fileUrl ? (
            <>
              <Button asChild variant="ghost" size="icon-lg">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Podgląd"
                  title="Podgląd"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon-lg">
                <a href={getDownloadUrl(fileUrl)} aria-label="Pobierz" title="Pobierz">
                  <Download className="w-4 h-4" />
                </a>
              </Button>
            </>
          ) : (
            <span className="text-xs">Plik niedostępny</span>
          )}
        </div>
      </div>
    </article>
  );
}
