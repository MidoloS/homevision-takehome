import { fetchHousesPage } from "@/lib/api";
import { HOUSES_PER_PAGE } from "@/lib/constants";
import type { HouseData } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";

const RETRY_DELAY_MS = 600;
const RETRY_ATTEMPTS = 3;

const fetchWithRetries = async (page: number): Promise<HouseData[]> => {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < RETRY_ATTEMPTS; attempt++) {
    try {
      return await fetchHousesPage(page, HOUSES_PER_PAGE);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt < RETRY_ATTEMPTS - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw lastError ?? new Error("Unknown error");
};

export const useInfiniteHouses = (
  initialHouses: HouseData[],
  initialLoadFailed: boolean
) => {
  const [houses, setHouses] = useState(initialHouses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialLoadFailed);
  const [hasMore, setHasMore] = useState(
    () => initialLoadFailed || initialHouses.length >= HOUSES_PER_PAGE
  );
  const [statusMessage, setStatusMessage] = useState("");

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const nextPageRef = useRef(initialLoadFailed ? 1 : 2);
  const fetchNextRef = useRef<(() => void) | null>(null);

  const fetchPage = useCallback(
    async (page: number, mode: "append" | "replace") => {
      setLoading(true);
      setError(false);
      try {
        const batch = await fetchWithRetries(page);
        if (mode === "replace") {
          setHouses(batch);
        } else {
          setHouses((prev) => {
            const seen = new Set(prev.map((h) => h.id));
            const merged = [...prev];
            for (const h of batch) {
              if (!seen.has(h.id)) merged.push(h);
            }
            return merged;
          });
        }
        setHasMore(batch.length >= HOUSES_PER_PAGE);
        nextPageRef.current = page + 1;
        setStatusMessage(
          `Loaded ${batch.length} more propert${batch.length === 1 ? "y" : "ies"}.`
        );
      } catch {
        setError(true);
        setStatusMessage(
          "Could not load properties. Use the Retry button to try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  fetchNextRef.current = () => {
    if (loading || error || !hasMore || nextPageRef.current <= 1) return;
    void fetchPage(nextPageRef.current, "append");
  };

  useEffect(() => {
    if (initialLoadFailed) void fetchPage(1, "replace");
  }, [initialLoadFailed, fetchPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || error) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchNextRef.current?.();
      },
      { rootMargin: "200px", threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, error]);

  const retry = useCallback(() => {
    const page = nextPageRef.current;
    void fetchPage(page, page <= 1 ? "replace" : "append");
  }, [fetchPage]);

  return { houses, loading, error, hasMore, statusMessage, sentinelRef, retry };
};
