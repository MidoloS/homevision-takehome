import type { HouseData, HousesApiResponse } from "./types";

const API_BASE = "https://staging.homevision.co/api_project/houses";

export const fetchHousesPage = async (
  page: number,
  perPage: number
): Promise<HouseData[]> => {
  const url = `${API_BASE}?page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as HousesApiResponse;
  if (!data.ok) {
    throw new Error(data.message ?? "Service Unavailable");
  }
  return data.houses;
};
