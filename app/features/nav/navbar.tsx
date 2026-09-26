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
        parked: header.offsetHeight, // Mirrors `-translate-y-full` below.
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

  return { mode, animated, anchorRef, headerRef };
};

const navbarFillStyles = "bg-[color-mix(in_srgb,var(--navbar-fill),var(--color-white)_40%)]";

type NavbarLogoProps = { className?: string };

const NavbarLogo = ({ className }: NavbarLogoProps) => (
  <Link
    href="/"
    variant="plain"
    className={cx(
      "logo inline-block -rotate-2 border border-black bg-white px-8 py-6 whitespace-nowrap uppercase",
      "lg:border-2 lg:px-16 lg:py-8",
      className
    )}
  >
    Alex Pagnotta
  </Link>
);

export type NavbarProps = {
  // Passed in rather than read from siteConfig, which would pull env validation (zod) into the client bundle.
  contactEmail: string;
};

export const Navbar = ({ contactEmail }: NavbarProps) => {
  const floating = FLOATING_ROUTES.has(usePathname());
  const { mode, animated, anchorRef, headerRef } = useNavbarMode(floating);

  return (
    // Holds the bar's height in the document, so the page below never shifts when it goes fixed.
    <div ref={anchorRef} className={cx("relative", floating ? "h-0" : "h-86 lg:h-90")}>
      <header
        ref={headerRef}
        className={cx(
          "inset-x-0 top-0 z-10 h-86 min-w-360 border-b-2 border-black lg:h-90",
          navbarFillStyles,
          floating ? "[--navbar-fill:var(--color-green-dark)]" : "[--navbar-fill:var(--page-accent)]",
          mode === "flow" ? "absolute" : "fixed",
          // Keyboard focus in the parked bar brings it back; a clicked logo keeps focus across navigation, so plain focus would too.
          mode === "hidden" && "-translate-y-full has-focus-visible:translate-y-0",
          animated && "transition-transform duration-300 ease-out motion-reduce:transition-none"
        )}
      >
        <Container size="md" className="flex h-full items-center justify-between px-(--page-side-spacing)">
          <NavbarLogo />
          <ButtonLink href={`mailto:${contactEmail}`} size="sm" className="uppercase">
            Say Hi!
          </ButtonLink>
        </Container>
      </header>
    </div>
  );
};
