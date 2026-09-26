/*
  An entry names an accent family rather than a colour, and each consumer picks the cut it
  needs: `-dark` where the accent fills a large area, `-light` where it is a small bright mark.
  The names are the token families themselves, so both cuts resolve by interpolation.
*/
export const ACCENTS = ["green", "yellow", "pink"] as const;

export type Accent = (typeof ACCENTS)[number];

/** The dark cut, for a wash the page's text has to stay readable against. */
export const darkAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-dark)` : undefined);

/** The light cut, for a small mark that should carry across the page. */
export const lightAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-light)` : undefined);

// What a detail page's `data-page-accent` sets on the layouts around it: the footer fill and the scrollbar.
// Spelled out so Tailwind generates each class, and keyed by `Accent` so a new accent has to add its row.
export const PAGE_ACCENT_STYLES = {
  green: {
    page: "has-data-[page-accent=green]:[--page-accent:var(--color-green-dark)] has-data-[page-accent=green]:[--page-gradient:var(--gradient-green)]",
    scrollbar: "has-data-[page-accent=green]:scrollbar-green-dark",
  },
  yellow: {
    page: "has-data-[page-accent=yellow]:[--page-accent:var(--color-yellow-dark)] has-data-[page-accent=yellow]:[--page-gradient:var(--gradient-yellow)]",
    scrollbar: "has-data-[page-accent=yellow]:scrollbar-yellow-dark",
  },
  pink: {
    page: "has-data-[page-accent=pink]:[--page-accent:var(--color-pink-dark)] has-data-[page-accent=pink]:[--page-gradient:var(--gradient-pink)]",
    scrollbar: "has-data-[page-accent=pink]:scrollbar-pink-dark",
  },
} as const satisfies Record<Accent, { page: string; scrollbar: string }>;
