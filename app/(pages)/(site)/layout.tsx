import type * as React from "react";
import { Footer } from "@/app/features/layout/footer";
import { Navbar } from "@/app/features/layout/navbar";
import { ScrollReset } from "@/app/features/layout/scroll-reset";
import { SmoothScroll } from "@/app/features/layout/smooth-scroll";
import { siteConfig } from "@/app/features/site/config";
import { cx } from "@/app/features/style/cva";
import { Marquee } from "@/app/features/ui/marquee";

const HEADER_MARQUEE_TEXT = "Latest post: Claude Code, minus the folder";
const HEADER_MARQUEE_HREF = "/writings/claude-code-minus-the-folder";
const FOOTER_MARQUEE_TEXT = "Thanks for visiting";

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
    <div>
      <a href="#main" className={skipLinkStyles}>
        Skip to content
      </a>
      <div className="relative z-1 bg-white">
        <aside aria-label="Announcement">
          <Marquee
            size="sm"
            text={HEADER_MARQUEE_TEXT}
            href={HEADER_MARQUEE_HREF}
            separator="•"
            trackClassName="animate-intro-rise"
          />
        </aside>
        <Navbar contactEmail={siteConfig.author.email} />
        <main id="main" className="flex flex-col">
          {children}
        </main>
        <aside aria-label="Sign-off">
          <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
        </aside>
      </div>
      <div className={footerWrapperStyles}>
        <Footer />
      </div>
      <ScrollReset />
      <SmoothScroll />
    </div>
  );
};

export default SiteLayout;
