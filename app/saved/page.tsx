import { SavedHouseList } from "@/components/SavedHouseList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved properties",
};

const SavedPage = async () => {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main
        id="main-content"
        tabIndex={-1}
        className="container mx-auto flex-1 p-8"
      >
        <h1 className="mb-6 text-2xl font-bold tracking-tighter text-zinc-950 dark:text-zinc-50">
          Saved
        </h1>
        <SavedHouseList />
      </main>
    </div>
  );
};

export default SavedPage;
