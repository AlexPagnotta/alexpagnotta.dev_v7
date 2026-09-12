"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { siteConfig } from "@/app/features/seo/config";
import { cx } from "@/app/features/style/utils";
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
        parked: header.offsetHeight * 2, // Mirrors `-translate-y-[200%]` below.
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

type NavbarLogoProps = { className?: string };

const NavbarLogo = ({ className }: NavbarLogoProps) => (
  <Link
    href="/"
    variant="plain"
    className={cx(
      "headline-4 inline-block -rotate-2 border-2 border-black bg-white px-8 whitespace-nowrap uppercase shadow-depth-lg lg:px-12",
      className
    )}
  >
    Alex Pagnotta
  </Link>
);

export const Navbar = () => {
  const floating = FLOATING_ROUTES.has(usePathname());
  const { mode, animated, anchorRef, headerRef } = useNavbarMode(floating);

  return (
    // Holds the bar's height in the document, so the page below never shifts when it goes fixed.
    <div ref={anchorRef} className={cx("relative", floating ? "h-0" : "h-96")}>
      <header
        ref={headerRef}
        // The desktop wordmark hangs past the bottom border, so the bar has to paint over the page below it.
        className={cx(
          "inset-x-0 top-0 z-10 h-96 min-w-360 border-b-2 border-black bg-grey-1",
          mode === "flow" ? "absolute" : "fixed",
          // Twice the bar's height, so the parked bar takes the overhanging wordmark out of sight with it.
          mode === "hidden" && "-translate-y-[200%]",
          animated && "transition-transform duration-300 ease-out motion-reduce:transition-none"
        )}
      >
        <Container
          size="lg"
          className="relative flex h-full items-center justify-between px-(--page-side-spacing) lg:justify-end"
        >
          {/* Centred and overhanging on desktop, so it leaves the row rather than sitting in it. */}
          <NavbarLogo className="lg:absolute lg:top-44 lg:left-1/2 lg:-translate-x-1/2" />
          <ButtonLink href={`mailto:${siteConfig.author.email}`} color="yellow-1">
            Say Hi!
          </ButtonLink>
        </Container>
      </header>
    </div>
  );
};
