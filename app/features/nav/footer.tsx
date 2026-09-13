import { siteConfig } from "@/app/features/seo/config";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Wordmark } from "@/app/features/ui/wordmark";

// Labels and order are the footer's own; the destinations come from the shared site config.
const LINKS = [
  { label: "Unsplash", href: siteConfig.social.unsplash },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Curriculum", href: siteConfig.resumeUrl },
];

export const Footer = () => {
  return (
    // The wordmark runs off the bottom edge, so the footer crops it rather than growing to fit.
    <footer className="flex flex-col overflow-clip bg-yellow-1 pt-80 lg:pt-96">
      <Container
        size="md"
        className="flex flex-col gap-80 px-(--page-side-spacing) lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex flex-col items-start gap-24 lg:gap-40">
          <h2 className="headline-1 flex flex-col items-start uppercase">
            <span>Want to</span>
            <span className="-mt-24 pl-120 lg:pl-248">Say hi?</span>
          </h2>
          <ButtonLink href={`mailto:${siteConfig.author.email}`} size="xl">
            Contact me
          </ButtonLink>
        </div>
        <nav
          aria-label="Elsewhere"
          className="flex flex-wrap justify-end gap-x-16 gap-y-20 lg:flex-col lg:items-end lg:gap-32"
        >
          {LINKS.map(({ label, href }) => (
            <ButtonLink key={label} href={href} className="uppercase">
              {label}
            </ButtonLink>
          ))}
        </nav>
      </Container>

      {/* Figma knocks the shadow out behind the letters, so the fill is the composite rather than 50% white. */}
      <Wordmark
        words={["ALEX", "PAGNOTTA"]}
        ratio={7.5}
        sunk
        joined
        repeated
        className="mt-47 text-[color-mix(in_srgb,var(--color-white)_50%,var(--color-yellow-1))] lg:mt-71"
      />
    </footer>
  );
};
