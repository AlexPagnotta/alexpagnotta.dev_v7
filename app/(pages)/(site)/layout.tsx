import type * as React from "react";
import { Footer } from "@/app/features/nav/footer";
import { Navbar } from "@/app/features/nav/navbar";
import { ScrollReset } from "@/app/features/nav/scroll-reset";
import { siteConfig } from "@/app/features/site/config";
import { ACCENTS, PAGE_ACCENT_STYLES } from "@/app/features/style/accents";
import { cx } from "@/app/features/style/cva";
import { Marquee } from "@/app/features/ui/marquee";

const HEADER_MARQUEE_TEXT = "Checkout my latest blog post, I built a secondary screen for my mac";
const FOOTER_MARQUEE_TEXT = "Thanks for visiting";

// A detail page names its accent with `data-page-accent`; the footer paints itself with it.
const pageAccentStyles = cx(
  "[--page-accent:var(--color-yellow-dark)] [--page-gradient:var(--gradient-yellow)]",
  ACCENTS.map((accent) => PAGE_ACCENT_STYLES[accent].page)
);

// Static while focused, or tabbing in would find it stuck behind the page and never scroll to it.
const footerWrapperStyles = cx("sticky focus-within:static", "bottom-[min(0px,100dvh-var(--footer-max-height))]");

const skipLinkStyles = cx(
  // `not-sr-only` would reset the padding, so the link is only hidden while it is not focused.
  "not-focus-visible:sr-only fixed top-16 left-16 z-20",
  "rounded-full border border-black bg-white px-16 py-8 body-1 whitespace-nowrap shadow-depth-4",
  "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black"
);

type Props = { children: React.ReactNode };

const SiteLayout = ({ children }: Props) => {
  return (
    <div className={pageAccentStyles}>
      <a href="#main" className={skipLinkStyles}>
        Skip to content
      </a>
      <div className="relative z-1 bg-white">
        <Marquee size="sm" text={HEADER_MARQUEE_TEXT} separator="•" trackClassName="animate-intro-rise" />
        <Navbar contactEmail={siteConfig.author.email} />
        <main id="main" className="flex flex-col">
          {children}
        </main>
        <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
      </div>
      <div className={footerWrapperStyles}>
        <Footer />
      </div>
      <ScrollReset />
    </div>
  );
};

export default SiteLayout;
