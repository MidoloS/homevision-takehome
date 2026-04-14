import type { HouseData } from "./types";
import {
  SAVED_HOUSES_CHANGE_EVENT,
  SAVED_HOUSES_STORAGE_KEY,
} from "./constants";

export const readSavedHouses = (): HouseData[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_HOUSES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HouseData[];
  } catch {
    return [];
  }
};

export const writeSavedHouses = (houses: HouseData[]) => {
  localStorage.setItem(SAVED_HOUSES_STORAGE_KEY, JSON.stringify(houses));
};

let savedListVersion = 0;

let cachedVersion = -1;
let cachedList: HouseData[] = [];

export const getSavedHousesSnapshot = (): HouseData[] => {
  const v = savedListVersion;
  if (v === cachedVersion) return cachedList;
  cachedVersion = v;
  cachedList = readSavedHouses();
  return cachedList;
};

const listeners = new Set<() => void>();

let globalListenersAttached = false;

const attachGlobalListeners = () => {
  if (typeof window === "undefined" || globalListenersAttached) return;
  globalListenersAttached = true;

  const notify = () => {
    savedListVersion += 1;
    listeners.forEach((fn) => fn());
  };

  window.addEventListener(SAVED_HOUSES_CHANGE_EVENT, notify);
  window.addEventListener("storage", notify);
};

export const subscribeSavedHouses = (onStoreChange: () => void) => {
  attachGlobalListeners();
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const isHouseSaved = (houseId: number): boolean => {
  return readSavedHouses().some((h) => h.id === houseId);
};
