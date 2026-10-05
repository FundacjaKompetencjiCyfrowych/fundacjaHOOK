"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_ERROR_MESSAGE = "Nie udało się załadować kolejnych elementów. Spróbuj ponownie.";

interface UsePaginatedItemsOptions<T> {
  initialItems: T[];
  pageSize: number;
  loadItemsAction: (start: number) => Promise<T[]>;
  resetKey?: string;
  errorMessage?: string;
}

export interface PaginationControls {
  hasMore: boolean;
  isLoading: boolean;
  loadError: boolean;
  errorMessage: string;
  loadMore: () => Promise<void>;
}

export interface PaginatedItemsResult<T> extends PaginationControls {
  items: T[];
}

export function usePaginatedItems<T>({
  initialItems,
  pageSize,
  loadItemsAction,
  resetKey = "default",
  errorMessage = DEFAULT_ERROR_MESSAGE,
}: UsePaginatedItemsOptions<T>): PaginatedItemsResult<T> {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialItems.length === pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const loadItemsActionRef = useRef(loadItemsAction);
  const activeRequestRef = useRef(0);
  const previousResetKeyRef = useRef(resetKey);
  const failedRequestRef = useRef<{ start: number; replaceItems: boolean } | null>(null);

  useEffect(() => {
    loadItemsActionRef.current = loadItemsAction;
  }, [loadItemsAction]);

  const requestPage = useCallback(
    async (start: number, replaceItems: boolean) => {
      const requestId = ++activeRequestRef.current;

      setIsLoading(true);
      setLoadError(false);
      failedRequestRef.current = null;

      try {
        const nextItems = await loadItemsActionRef.current(start);
        if (activeRequestRef.current !== requestId) return;

        setItems((currentItems) => (replaceItems ? nextItems : [...currentItems, ...nextItems]));
        setHasMore(nextItems.length > 0 && nextItems.length === pageSize);
      } catch {
        if (activeRequestRef.current !== requestId) return;
        failedRequestRef.current = { start, replaceItems };
        setLoadError(true);
      } finally {
        if (activeRequestRef.current === requestId) setIsLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    if (previousResetKeyRef.current === resetKey) return;

    previousResetKeyRef.current = resetKey;
    void requestPage(0, true);
  }, [requestPage, resetKey]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const failedRequest = failedRequestRef.current;
    if (failedRequest) {
      await requestPage(failedRequest.start, failedRequest.replaceItems);
      return;
    }

    await requestPage(items.length, false);
  }, [hasMore, isLoading, items.length, requestPage]);

  return {
    items,
    hasMore,
    isLoading,
    loadError,
    errorMessage,
    loadMore,
  };
}
