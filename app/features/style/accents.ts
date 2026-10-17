// An entry names an accent family; each consumer picks the `-dark` or `-light` cut by interpolating the name.
export const ACCENTS = ["green", "yellow", "pink", "gray", "purple"] as const;

export type Accent = (typeof ACCENTS)[number];

/** The dark cut, for a wash the page's text has to stay readable against. */
export const darkAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-dark)` : undefined);

/** The light cut, for a small mark that should carry across the page. */
export const lightAccent = (accent: Accent | undefined) => (accent ? `var(--color-${accent}-light)` : undefined);
