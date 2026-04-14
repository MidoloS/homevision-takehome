# HomeVision

A property listing app built with **Next.js 16**, **React 19**, and **Tailwind CSS 4** as a senior front-end take-home challenge.

Live properties are fetched from the HomeVision API and displayed in an infinite-scroll grid. Users can save their favourite listings and revisit them on a dedicated page.

## Getting Started

```bash
npm install
npm run dev
```

Live Demo https://homevision-takehome.vercel.app/

Open [http://localhost:3000](http://localhost:3000).

## Technical Decisions

### Resilient Data Fetching

The HomeVision API is intentionally unreliable — requests fail randomly. To handle this gracefully:

- The first page is fetched **server-side** (SSR). If that fails, the client transparently recovers on mount.
- Every fetch is wrapped in an **automatic retry strategy** (3 attempts, 600 ms delay between each) before surfacing an error.
- On failure, a **Retry button** is shown so the user stays in control.
- While data is in flight, **skeleton cards** fill the grid to communicate loading state and prevent layout shift.

### Infinite Scroll

Subsequent pages load automatically via an `IntersectionObserver` sentinel at the bottom of the grid. All pagination, retry, and error state lives in a single **`useInfiniteHouses`** custom hook, keeping the `HouseList` component focused on presentation.

### Saved Properties (Favourites)

- Each card has a **heart button** that toggles a favourite. State is persisted to `localStorage` and synchronised across the app with `useSyncExternalStore`, so the UI reacts instantly.
- A dedicated `/saved` page lists every saved property. Because the full `HouseData` object is stored, the saved page works entirely offline — no extra API calls required.
- The heart includes a **pop animation** on toggle for tactile feedback (respects `prefers-reduced-motion`).

### Supplementary Data

The API returns only address, price, owner, and photo. To produce a richer card design I generate **two deterministic extra fields** on the client — bedrooms and square metres — derived from the house ID. This avoids the need for a custom backend while still showcasing a realistic card layout.

### Custom Hook Architecture

`HouseList` was growing complex with 6 `useState`, 7 `useRef`, and 4 `useEffect` calls managing pagination, retries, and accessibility announcements. I extracted all of that into **`useInfiniteHouses`**, reducing the component to pure JSX and the hook internals to 5 states, 3 refs, and 2 effects — roughly half the surface area. Key simplifications:

- `nextPage` moved from state to a ref (it doesn't affect rendering).
- Four "mirror" refs used to avoid stale closures were replaced by a single `fetchNextRef` callback ref.
- Status messages for screen readers are now set directly inside the fetch function, eliminating two dedicated effects.

## Accessibility (WCAG)

Accessibility was a first-class concern throughout:

| Feature              | Implementation                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Focus management** | Visible `:focus-visible` ring on every interactive element; `outline` suppressed on mouse clicks.                                               |
| **Skip link**        | Hidden "Skip to main content" link becomes visible on Tab, smoothly scrolls to `#main-content` (instant if `prefers-reduced-motion`).           |
| **Semantic HTML**    | `<header>`, `<nav>`, `<main>`, `<article>` used throughout. Headings follow a logical hierarchy.                                                |
| **ARIA attributes**  | `aria-label` on icon buttons, `aria-live` region for dynamic loading/error announcements, `role="switch"` + `aria-checked` on the theme toggle. |
| **Reduced motion**   | All animations (`heart-pop`, skeleton pulse) are disabled when the user prefers reduced motion.                                                 |
| **Touch targets**    | Every interactive element meets the 44 × 44 px minimum touch target.                                                                            |
| **Colour contrast**  | Text and interactive elements meet WCAG AAA contrast ratios in both light and dark themes.                                                      |

## Design & Theming

- **Dark / Light mode** with a toggle switch (sun/moon icons). The theme is persisted in `localStorage` and an inline `<script>` applies it before first paint to avoid a flash of wrong theme.
- **Typography**: body text in **Inter**, headings in **Montserrat** — loaded and optimised via `next/font`.
- **Fully responsive** grid: 1 column on mobile, 2 on tablet, 3 on desktop, 4 on wide screens. The navbar wraps gracefully at every breakpoint.

## Project Structure

```
app/
  layout.tsx          Root layout (fonts, theme init, nav)
  page.tsx            Home — SSR property grid
  saved/page.tsx      Saved properties page
  globals.css         Theme tokens, focus styles, animations
components/
  HouseList.tsx       Infinite-scroll grid (presentation)
  House.tsx           Individual property card
  HouseSkeleton.tsx   Loading placeholder card
  SaveButton.tsx      Heart toggle with pop animation
  SavedHouseList.tsx  Client-side saved list
  Navbar.tsx          Top navigation bar
  ThemeToggle.tsx     Dark/light switch
  SkipLink.tsx        Accessibility skip link
hooks/
  useInfiniteHouses.ts  Pagination, retries, error & loading state
lib/
  api.ts              API client
  constants.ts        Shared constants
  fake-data.ts        Deterministic extra fields
  saved-store.ts      localStorage store + useSyncExternalStore glue
  types.ts            Shared TypeScript types
```

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
