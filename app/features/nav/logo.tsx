import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { Link } from "@/app/features/ui/link";

const letterStyles = cx(
  "inline-block whitespace-pre",
  "transition-[translate] duration-300 ease-pop motion-reduce:transition-none",
  "delay-[calc(var(--letter-index)*20ms)]"
);

const outgoingLetterStyles =
  "group-hover:translate-y-(--letter-travel) group-focus-visible:translate-y-(--letter-travel)";

const incomingLetterStyles =
  "-translate-y-(--letter-travel) group-hover:translate-y-0 group-focus-visible:translate-y-0";

// Spans the logo box's `py-8`, so letters clip at the box edge and travel far enough to clear it.
const letterClipStyles = cx("relative block -my-8 py-8 overflow-clip", "[--letter-travel:calc(100%+var(--spacing)*8)]");

type StaggeredLettersProps = { text: string; className: string; indexOffset?: number };

const StaggeredLetters = ({ text, className, indexOffset = 0 }: StaggeredLettersProps) =>
  [...text].map((letter, index) => (
    <span
      // biome-ignore lint/suspicious/noArrayIndexKey: the letters never reorder.
      key={index}
      className={cx(letterStyles, className)}
      style={{ "--letter-index": index + indexOffset } as React.CSSProperties}
    >
      {letter}
    </span>
  ));

const logoStyles = cva({
  base: ["inline-block border border-black bg-white px-12 py-8 whitespace-nowrap uppercase", "animate-intro-rise"],
  variants: {
    size: {
      sm: "logo-sm",
      md: "logo lg:border-2 lg:px-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const LOGO_NAME = "Alex Pagnotta";
const LOGO_HOVER_TEXT = "Back home";

/*
  Both words move together, one travel apart, so they never overlap and reversing mid-hover stays smooth.
  The centred word starts its stagger at the column it sits over, so each letter swaps with the one beneath it.
*/
const HOVER_INDEX_OFFSET = Math.floor((LOGO_NAME.length - LOGO_HOVER_TEXT.length) / 2);

export type LogoProps = VariantProps<typeof logoStyles> & { home?: boolean; className?: string };

// On the homepage it would only link to itself, so it's plain text there.
export const Logo = ({ home = false, size, className }: LogoProps) =>
  home ? (
    <span className={cx(logoStyles({ size }), className)}>{LOGO_NAME}</span>
  ) : (
    <Link href="/" variant="plain" className={cx("group", logoStyles({ size }), className)}>
      <span className="sr-only">{LOGO_NAME}</span>
      {/* On hover the name drops out letter by letter while "Back home" drops in from above. */}
      <span aria-hidden="true" className={letterClipStyles}>
        <StaggeredLetters text={LOGO_NAME} className={outgoingLetterStyles} />
        <span className="absolute inset-0 flex items-center justify-center">
          <StaggeredLetters text={LOGO_HOVER_TEXT} className={incomingLetterStyles} indexOffset={HOVER_INDEX_OFFSET} />
        </span>
      </span>
    </Link>
  );
