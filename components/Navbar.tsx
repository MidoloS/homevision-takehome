import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <header className="shrink-0 border-b border-zinc-300  bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto justify-center  flex flex-wrap items-center md:justify-between gap-4 px-8 py-4">
        <div>
          <Link
            href="/"
            className="font-heading text-lg tracking-wider font-bold text-center text-zinc-950 dark:text-zinc-50"
            title="HomeVision home"
          >
            HOMEVISION
          </Link>
        </div>
        <nav
          className="flex flex-wrap items-center gap-4 sm:gap-6"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 text-sm font-medium text-zinc-900 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            title="Home"
          >
            Home
          </Link>
          <Link
            href="/saved"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 text-sm font-medium text-zinc-900 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            title="Saved properties"
          >
            Saved
          </Link>
          <Link
            href="#"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 text-sm font-medium text-zinc-900 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            title="Help"
          >
            Help
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
