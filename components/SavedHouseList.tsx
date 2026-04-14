"use client";

import { useSyncExternalStore } from "react";
import type { HouseData } from "@/lib/types";
import {
  getSavedHousesSnapshot,
  subscribeSavedHouses,
} from "@/lib/saved-store";
import { House } from "./House";

export const SavedHouseList = () => {
  const houses = useSyncExternalStore(
    subscribeSavedHouses,
    getSavedHousesSnapshot,
    () => [] as HouseData[]
  );

  if (houses.length === 0) {
    return (
      <p className="text-zinc-600 dark:text-zinc-300">
        No saved properties yet. Use the heart on a listing to save one.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {houses.map((h) => (
        <House key={h.id} house={h} />
      ))}
    </div>
  );
};
