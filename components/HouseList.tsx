"use client";

import { useInfiniteHouses } from "@/hooks/useInfiniteHouses";
import type { HouseData } from "@/lib/types";
import { House } from "./House";
import { HouseSkeleton } from "./HouseSkeleton";

const SKELETON_COUNT = 3;

type HouseListProps = {
  houses: HouseData[];
  initialLoadFailed: boolean;
};

export const HouseList = ({
  houses: initialHouses,
  initialLoadFailed,
}: HouseListProps) => {
  const { houses, loading, error, hasMore, statusMessage, sentinelRef, retry } =
    useInfiniteHouses(initialHouses, initialLoadFailed);

  return (
    <div className="w-full">
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {houses.map((h) => (
          <House key={h.id} house={h} />
        ))}
        {(loading || error) &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <HouseSkeleton key={`sk-${i}`} />
          ))}
      </div>

      {error && !loading && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={retry}
            className="min-h-[44px] min-w-[44px] cursor-pointer rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Retry
          </button>
        </div>
      )}

      {hasMore && !error && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
      )}
    </div>
  );
};
