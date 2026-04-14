import { HouseList } from "@/components/HouseList";
import { fetchHousesPage } from "@/lib/api";
import { HOUSES_PER_PAGE } from "@/lib/constants";
import type { HouseData } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOMEVISION",
  description: "Property listings and saved homes",
};

const Home = async () => {
  let initialHouses: HouseData[] = [];
  let initialLoadFailed = false;

  try {
    initialHouses = await fetchHousesPage(1, HOUSES_PER_PAGE);
  } catch {
    initialLoadFailed = true;
  }

  return (
    <div className="flex flex-1 flex-col font-sans">
      <main
        id="main-content"
        tabIndex={-1}
        className="container mx-auto flex-1 p-8"
      >
        <h1 className="font-heading  mb-6 text-2xl font-bold tracking-tighter text-zinc-950 dark:text-zinc-50">
          New in your Town
        </h1>
        <HouseList
          houses={initialHouses}
          initialLoadFailed={initialLoadFailed}
        />
      </main>
    </div>
  );
};

export default Home;
