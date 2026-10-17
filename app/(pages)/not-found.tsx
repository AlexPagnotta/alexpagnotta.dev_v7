import { Logo } from "@/app/features/layout/logo";
import { ElasticText } from "@/app/features/not-found/elastic-text";
import { cx } from "@/app/features/style/cva";
import { ButtonLink } from "@/app/features/ui/button";

const headingStyles = cx(
  "display-1 select-none drop-shadow-depth-6 lg:drop-shadow-depth-12",
  // "FOUND" runs about 3.6em wide, so on phones the size shrinks until it fits between the gutters.
  "max-lg:[font-size:min(var(--text-display-1-mobile),(100vw-2*var(--page-side-spacing))/3.6)] max-lg:leading-none",
  "animate-intro-rise intro-delay-title"
);

const pageStyles = cx(
  "relative flex min-h-dvh flex-col items-center justify-center gap-48 overflow-clip lg:gap-64",
  "bg-pink-dark px-(--page-side-spacing) py-64 text-center"
);

const gridStyles = cx(
  "[--grid-line:color-mix(in_srgb,var(--color-black)_15%,transparent)]",
  "bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)]",
  "bg-size-[--spacing(80)_--spacing(80)] lg:bg-size-[--spacing(120)_--spacing(120)]",
  // A row's 1px line lands on the logo's bottom border.
  "[--logo-top:--spacing(24)]",
  "bg-[position:center_calc(var(--logo-top)+var(--logo-sm-height)-1px)]"
);

const NotFound = () => {
  return (
    <main className={cx(pageStyles, gridStyles)}>
      <Logo size="sm" className="absolute top-(--logo-top) left-24" />

      <h1 className={headingStyles}>
        <ElasticText words={["NOT", "FOUND"]} />
      </h1>

      <ButtonLink href="/" color="yellow-light" size="lg" className="-rotate-2 animate-intro-rise intro-delay-copy">
        Take me home
      </ButtonLink>
    </main>
  );
};

export default NotFound;
