"use client";

import { SAVED_HOUSES_CHANGE_EVENT } from "@/lib/constants";
import {
  isHouseSaved,
  readSavedHouses,
  subscribeSavedHouses,
  writeSavedHouses,
} from "@/lib/saved-store";
import type { HouseData } from "@/lib/types";
import { useCallback, useState, useSyncExternalStore } from "react";

export const SaveButton = ({ house }: { house: HouseData }) => {
  const saved = useSyncExternalStore(
    subscribeSavedHouses,
    () => isHouseSaved(house.id),
    () => false,
  );

  const [pop, setPop] = useState(false);

  const handleClick = useCallback(() => {
    setPop(true);
    window.setTimeout(() => setPop(false), 350);
    const list = readSavedHouses();
    const idx = list.findIndex((h) => h.id === house.id);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(house);
    }
    writeSavedHouses(list);
    window.dispatchEvent(new Event(SAVED_HOUSES_CHANGE_EVENT));
  }, [house]);

  const removeLabel = `Remove ${house.address} from saved properties`;
  const saveLabel = `Save ${house.address} to favorites`;
  const ariaLabel = saved ? removeLabel : saveLabel;
  const title = saved ? "Remove from saved" : "Save to favorites";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute top-2 right-2 flex h-11 min-h-[44px] w-11 min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900"
      aria-label={ariaLabel}
      title={title}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={saved ? 0 : 2}
        className={`h-5 w-5 ${saved ? "text-red-500" : "text-zinc-700 dark:text-zinc-200"} ${pop ? "heart-pop-active" : ""}`}
        aria-hidden
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
};
