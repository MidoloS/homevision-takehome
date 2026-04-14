"use client";

import { THEME_STORAGE_KEY } from "@/lib/constants";
import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const getThemeFromDom = (): Theme =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
    focusable="false"
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
);

export const ThemeToggle = () => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeFromDom,
    () => "light" as Theme,
  );

  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    const next = getThemeFromDom() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span
        className="relative h-9 w-17 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 p-1 shadow-inner transition-colors dark:bg-zinc-900"
        aria-hidden
      >
        <SunIcon className="pointer-events-none absolute left-2 top-1/2 z-1 h-4 w-4 -translate-y-1/2 text-amber-600 dark:text-zinc-500" />
        <MoonIcon className="pointer-events-none absolute right-2 top-1/2 z-1 h-4 w-4 -translate-y-1/2 text-zinc-600 dark:text-zinc-200" />
        <span
          className={`absolute left-[6px] top-1/2 z-2 block h-6 w-6 -translate-y-1/2 rounded-full shadow-md transition-transform duration-200 ease-out will-change-transform ${
            isDark
              ? "translate-x-8 bg-white shadow-zinc-900/25 dark:shadow-black/40"
              : "translate-x-0 bg-zinc-900 shadow-zinc-900/30"
          }`}
        />
      </span>
    </button>
  );
};
