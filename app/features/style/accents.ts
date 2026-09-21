/*
  An entry names an accent family rather than a colour, and each consumer picks the cut it
  needs: `-1` where the accent fills a large area, `-2` where it is a small bright mark.
  The names are the token families themselves, so both cuts resolve by interpolation.
*/
export const ACCENTS = ["green", "yellow", "blue", "pink", "violet"] as const;

export type Accent = (typeof ACCENTS)[number];

/** The muted cut, for a wash the page's text has to stay readable against. */
export const mutedAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-1)` : undefined);

/** The bright cut, for a small mark that should carry across the page. */
export const brightAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-2)` : undefined);
