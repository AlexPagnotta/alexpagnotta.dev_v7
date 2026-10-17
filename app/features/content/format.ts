const pad = (part: number) => String(part).padStart(2, "0");

// Spelled "18 - 09 - 2025" as in the design; read in UTC, since `z.coerce.date()` parks frontmatter dates at UTC midnight.
export const formatDate = (date: Date) =>
  `${pad(date.getUTCDate())} - ${pad(date.getUTCMonth() + 1)} - ${date.getUTCFullYear()}`;
