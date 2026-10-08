"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { cx } from "@/app/features/style/cva";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Link } from "@/app/features/ui/link";

/** A section the revealed bar must clear before it may pin. Opt in with `data-navbar-boundary`. */
const BOUNDARY_SELECTOR = "[data-navbar-boundary]";

/** Routes whose opening section owns the top: there the bar exists only as the scroll-up reveal. */
const FLOATING_ROUTES = new Set(["/"]);

/** Trackpads and rubber-banding jitter by a few px, so ask for real travel before flipping direction. */
const DIRECTION_THRESHOLD = 4;

/** `flow` sits under the marquee and scrolls away; `hidden` and `pinned` are fixed, parked or revealed. */
type NavbarMode = "flow" | "hidden" | "pinned";

type ModeInput = { flowTop: number; parked: number; scrollingUp: boolean; pastBoundary: boolean; floating: boolean };

/*
  The bar hands over between the document and the viewport at the offset where both paint
  identically, which is `parked` up, since that is exactly how far the fixed bar is translated.
*/
const nextMode = (mode: NavbarMode, input: ModeInput): NavbarMode => {
  const { flowTop, parked, scrollingUp, pastBoundary, floating } = input;
  const revealed = scrollingUp && pastBoundary ? "pinned" : "hidden";

  if (floating) return revealed;
  if (mode === "flow") return flowTop <= -parked ? "hidden" : "flow";
  if (flowTop >= (mode === "pinned" ? 0 : -parked)) return "flow";
  return revealed;
};

const useNavbarMode = (floating: boolean) => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const overhangRef = React.useRef<HTMLDivElement>(null);
  const [{ mode, animated }, setState] = React.useState<{ mode: NavbarMode; animated: boolean }>({
    mode: floating ? "hidden" : "flow",
    animated: false,
  });

  React.useEffect(() => {
    let lastY = window.scrollY;
    let scrollingUp = false;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const anchor = anchorRef.current;
      const header = headerRef.current;
      if (!anchor || !header) return;

      const y = window.scrollY;
      if (Math.abs(y - lastY) > DIRECTION_THRESHOLD) {
        scrollingUp = y < lastY;
        lastY = y;
      }

      const boundary = document.querySelector(BOUNDARY_SELECTOR);
      const input = {
        flowTop: anchor.getBoundingClientRect().top,
        // The button hangs below the bar, so it parks only once the button is out of view too.
        parked: Math.max(
          header.offsetHeight,
          (overhangRef.current?.getBoundingClientRect().bottom ?? 0) - header.getBoundingClientRect().top
        ),
        scrollingUp,
        pastBoundary: !boundary || boundary.getBoundingClientRect().bottom <= 0,
        floating,
      };

      setState((prev) => {
        const mode = nextMode(prev.mode, input);
        // Entering or leaving `flow` moves the paint origin too, so only fixed-to-fixed moves animate.
        return mode === prev.mode ? prev : { mode, animated: prev.mode !== "flow" && mode !== "flow" };
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [floating]);

  return { mode, animated, anchorRef, headerRef, overhangRef };
};

const navbarFillStyles = "bg-[color-mix(in_srgb,var(--page-accent),var(--color-white)_40%)]";

const barContentStyles = "flex h-full items-end justify-between px-(--page-side-spacing)";

// Clips the logo's lower edge so it reads as sinking behind the bottom border.
const logoClipStyles = "flex h-full items-end overflow-clip";

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

const sayHiStyles = "uppercase [--btn-fill:var(--navbar-accent)] animate-intro-appear animation-delay-150";

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

const logoStyles = cx(
  "logo inline-block translate-y-1/8 border border-black bg-white px-12 py-8 whitespace-nowrap uppercase",
  "lg:border-2 lg:px-16",
  "animate-intro-rise"
);

const LOGO_NAME = "Alex Pagnotta";
const LOGO_HOVER_TEXT = "Back home";

/*
  Both words move together, one travel apart, so they never overlap and reversing mid-hover stays smooth.
  The centred word starts its stagger at the column it sits over, so each letter swaps with the one beneath it.
*/
const HOVER_INDEX_OFFSET = Math.floor((LOGO_NAME.length - LOGO_HOVER_TEXT.length) / 2);

type NavbarLogoProps = { home: boolean };

// On the homepage it would only link to itself, so it's plain text there.
const NavbarLogo = ({ home }: NavbarLogoProps) =>
  home ? (
    <span className={logoStyles}>{LOGO_NAME}</span>
  ) : (
    <Link href="/" variant="plain" className={cx("group", logoStyles)}>
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

export type NavbarProps = {
  // Passed in rather than read from siteConfig, which would pull env validation (zod) into the client bundle.
  contactEmail: string;
};

export const Navbar = ({ contactEmail }: NavbarProps) => {
  const pathname = usePathname();
  const floating = FLOATING_ROUTES.has(pathname);
  const { mode, animated, anchorRef, headerRef, overhangRef } = useNavbarMode(floating);

  return (
    // Holds the bar's height in the document, so the page below never shifts when it goes fixed.
    <div ref={anchorRef} className={cx("relative", floating ? "h-0" : "h-72 lg:h-76")}>
      <header
        ref={headerRef}
        className={cx(
          "inset-x-0 top-0 z-10 h-72 min-w-360 border-b-2 border-black lg:h-76",
          floating ? "bg-green-dark [--navbar-accent:var(--color-yellow-light)]" : navbarFillStyles,
          mode === "flow" ? "absolute" : "fixed",
          // Keyboard focus in the parked bar brings it back; a clicked logo keeps focus across navigation, so plain focus would too.
          mode === "hidden" && "-translate-y-[150%] has-focus-visible:translate-y-0",
          animated && "transition-transform duration-300 ease-out motion-reduce:transition-none"
        )}
      >
        <Container size="md" className={barContentStyles}>
          <div className={logoClipStyles}>
            <NavbarLogo home={pathname === "/"} />
          </div>
          {/* Wrapped so the overhang's translate doesn't fight the button's own lift translate. */}
          <div ref={overhangRef} className="self-center md:translate-y-1/3 md:self-end">
            {/* The button has no responsive size, so each breakpoint gets its own. */}
            <ButtonLink href={`mailto:${contactEmail}`} size="sm" className={cx(sayHiStyles, "md:hidden")}>
              Say Hi!
            </ButtonLink>
            <ButtonLink href={`mailto:${contactEmail}`} className={cx(sayHiStyles, "hidden md:inline-flex")}>
              Say Hi!
            </ButtonLink>
          </div>
        </Container>
      </header>
    </div>
  );
};
