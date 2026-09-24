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
