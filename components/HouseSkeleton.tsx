export const HouseSkeleton = () => (
  <div
    className="overflow-hidden rounded-lg dark:border-zinc-600 dark:bg-zinc-950"
    role="status"
    aria-busy="true"
    aria-label="Loading property card"
  >
    <div
      className="aspect-[4/3] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800"
      aria-hidden
    />
    <div className="space-y-3 mt-4" aria-hidden>
      <div className="h-7 w-[100px] animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-[200px]  animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-1/2 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);
