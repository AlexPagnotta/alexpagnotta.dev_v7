import { formatDistanceStrict } from "date-fns";

const titleCase = (value: string) => value.replace(/\b\w/g, (char) => char.toUpperCase());

// Renders a date as a relative phrase like "2 Days Ago", scaling the unit with distance.
export const formatRelativeDate = (date: Date, now: Date = new Date()): string =>
  titleCase(formatDistanceStrict(date, now, { addSuffix: true }));
