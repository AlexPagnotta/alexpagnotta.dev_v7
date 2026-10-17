"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/app/features/layout/logo";
import { useNavbarMode } from "@/app/features/layout/use-navbar-mode";
import { cx } from "@/app/features/style/cva";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";

/** Routes whose opening section owns the top: there the bar exists only as the scroll-up reveal. */
const FLOATING_ROUTES = new Set(["/"]);

const navbarFillStyles = "bg-[color-mix(in_srgb,var(--page-accent),var(--color-white)_40%)]";

const barContentStyles = "flex h-full items-end justify-between px-(--page-side-spacing)";

// Clips the logo's lower edge so it reads as sinking behind the bottom border.
const logoClipStyles = "flex h-full items-end overflow-clip";

const sayHiStyles = "uppercase [--btn-fill:var(--navbar-accent)] animate-intro-appear intro-delay-action";

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
            <Logo home={pathname === "/"} className="translate-y-1/8" />
          </div>
          {/* Wrapped so the overhang's translate doesn't fight the button's own lift translate. */}
          <div ref={overhangRef} className="self-center md:translate-y-1/3 md:self-end">
            <ButtonLink href={`mailto:${contactEmail}`} size="sm-md" className={sayHiStyles}>
              Say Hi!
            </ButtonLink>
          </div>
        </Container>
      </header>
    </div>
  );
};
