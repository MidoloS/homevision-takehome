"use client";

export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-to-main"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById("main-content");
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        el?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
        window.setTimeout(() => el?.focus(), 0);
      }}
    >
      Skip to main content
    </a>
  );
};
