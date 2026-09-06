import { siteConfig } from "@/app/features/seo/config";
import { cx } from "@/app/features/style/utils";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Link } from "@/app/features/ui/link";

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
  return (
    // The desktop wordmark hangs past the bottom border, so the bar has to paint over the page below it.
    <header className="relative z-10 h-96 border-b-2 border-black bg-grey-1">
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
  );
};
