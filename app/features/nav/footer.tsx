import { siteConfig } from "@/app/features/seo/config";
import { cx } from "@/app/features/style/utils";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Wordmark } from "@/app/features/ui/wordmark";
import { NAME_WORDMARK } from "@/app/features/utils/config";

// Labels and order are the footer's own; the destinations come from the shared site config.
const LINKS = [
  { label: "Unsplash", href: siteConfig.social.unsplash },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Curriculum", href: siteConfig.resumeUrl },
];

const wordmarkStyles = cx(
  "mt-88 lg:mt-125 [--wordmark-floor:var(--text-display-2-mobile)]",
  // Laid over the footer colour, since Figma knocks the shadow out behind the translucent fill.
  "[--wordmark-fill:var(--page-gradient),linear-gradient(var(--page-accent),var(--page-accent))]",
  "max-md:translate-x-[calc(50%_-_50cqw_-_var(--page-side-spacing))]"
);

export const Footer = () => {
  return (
    // The wordmark runs off the bottom edge, so the footer crops it rather than growing to fit.
    <footer className="flex flex-col overflow-clip bg-(--page-accent) pt-64 lg:pt-96">
      <Container
        size="md"
        className="flex flex-col gap-64 px-(--page-side-spacing) lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex flex-col items-start gap-32 lg:gap-40">
          <h2 className="heading-1 flex flex-col items-start uppercase">
            <span>Want to</span>
            <span className="pl-80 lg:pl-248">Say hi?</span>
          </h2>
          <ButtonLink href={`mailto:${siteConfig.author.email}`} size="xl" className="-rotate-2">
            Contact Me
          </ButtonLink>
        </div>
        <nav aria-label="Elsewhere" className="flex flex-wrap justify-end gap-16 lg:flex-col lg:items-end lg:gap-32">
          {LINKS.map(({ label, href }) => (
            <ButtonLink key={label} href={href} size="md" className="uppercase">
              {label}
            </ButtonLink>
          ))}
        </nav>
      </Container>

      <Wordmark {...NAME_WORDMARK} sunk repeated className={wordmarkStyles} />
    </footer>
  );
};
