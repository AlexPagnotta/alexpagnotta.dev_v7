"use client";

import { domAnimation, LazyMotion, m, type SpringOptions, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { type PushTarget, useElasticPush } from "@/app/features/not-found/use-elastic-push";
import { cx } from "@/app/features/style/cva";
import { SplitLetters } from "@/app/features/ui/split-text";

const TILT = 0.25;

const pushSpring: SpringOptions = { stiffness: 360, damping: 13, mass: 1 };

const glyphStyles = cx("inline-block text-white", "glyph-stroke-2 px-[0.08em] -mx-[0.08em] will-change-transform");

type LetterProps = { children: string; target: PushTarget };

const Letter = ({ children, target }: LetterProps) => {
  const x = useSpring(target.x, pushSpring);
  const y = useSpring(target.y, pushSpring);
  const rotate = useTransform(x, (value) => value * TILT);

  return (
    <m.span data-letter style={{ x, y, rotate }} className={glyphStyles}>
      {children}
    </m.span>
  );
};

type ElasticTextProps = { words: string[]; className?: string };

export const ElasticText = ({ words, className }: ElasticTextProps) => {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const wordTargets = useElasticPush(rootRef, words);

  return (
    <LazyMotion features={domAnimation} strict>
      {/* `touch-none` keeps a drag that starts on the letters from scrolling a page that overflows. */}
      <span ref={rootRef} className={cx("relative flex touch-none flex-wrap justify-center gap-x-[0.25em]", className)}>
        <span className="sr-only">{words.join(" ")}</span>
        {words.map((word, wordIndex) => (
          <span key={word} aria-hidden="true" className="whitespace-nowrap">
            <SplitLetters text={word}>
              {(letter, index) => <Letter target={wordTargets[wordIndex][index]}>{letter}</Letter>}
            </SplitLetters>
          </span>
        ))}
      </span>
    </LazyMotion>
  );
};
