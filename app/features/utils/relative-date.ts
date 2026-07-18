const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

const titleCase = (value: string) => value.replace(/\b\w/g, (char) => char.toUpperCase());

// Renders a date as a relative phrase like "2 Days Ago", scaling the unit with distance.
export const formatRelativeDate = (date: Date, now: Date = new Date()): string => {
  let duration = (date.getTime() - now.getTime()) / 1000;

  for (const { amount, unit } of DIVISIONS) {
    if (Math.abs(duration) < amount) return titleCase(rtf.format(Math.round(duration), unit));
    duration /= amount;
  }

  return titleCase(rtf.format(Math.round(duration), "year"));
};
