"use client";

import { Button } from "@/app/_components/ui/button";
import type { PaginationControls } from "@/lib/hooks/usePaginatedItems";

interface LoadMoreButtonProps {
  pagination: PaginationControls;
}

export default function LoadMoreButton({ pagination }: LoadMoreButtonProps) {
  const { hasMore, isLoading, loadError, errorMessage, loadMore } = pagination;

  return (
    <>
      {(hasMore || isLoading || loadError) && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={isLoading} className="cursor-pointer">
            {isLoading ? "Ładowanie..." : "Załaduj więcej"}
          </Button>
        </div>
      )}
      {loadError && (
        <p role="alert" className="mt-4 text-center">
          {errorMessage}
        </p>
      )}
    </>
  );
}
