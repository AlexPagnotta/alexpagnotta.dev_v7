import type { WordmarkProps } from "@/app/features/ui/wordmark";

// The ratio is measured for these exact words, so the two change together.
export const NAME_WORDMARK = {
  words: ["ALEX", "PAGNOTTA"],
  ratio: 8.1,
} as const satisfies Pick<WordmarkProps, "words" | "ratio">;
