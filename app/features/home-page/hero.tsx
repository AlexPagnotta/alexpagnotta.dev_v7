import type { StaticImageData } from "next/image";
import type * as React from "react";
import bread from "@/app/features/home-page/assets/bread.png";
import camera from "@/app/features/home-page/assets/camera.png";
import face from "@/app/features/home-page/assets/face.png";
import printer from "@/app/features/home-page/assets/printer.png";
import { NAME_WORDMARK } from "@/app/features/site/config";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { Container } from "@/app/features/ui/container";
import { Image } from "@/app/features/ui/image";
import { BaseLink } from "@/app/features/ui/link";
import { Wordmark } from "@/app/features/ui/wordmark";

const wordmarkStyles = cx(
  "[--wordmark-fill:var(--gradient-green)] max-md:gap-16",
  "animate-intro-rise animation-delay-60"
);

const highlightStyles = cva({
  // Inline, so the pill takes its height from the line's own content box and never shifts the copy.
  // `text-black` is explicit because the UA paints `mark` with the system `marktext` colour.
  base: "rounded-lg px-8 text-black whitespace-nowrap",
  variants: {
    color: {
      "yellow-dark": "border border-black bg-yellow-dark",
      black: "bg-black text-gray-100",
    },
  },
  defaultVariants: {
    color: "yellow-dark",
  },
});

type HighlightProps = React.ComponentProps<"mark"> & VariantProps<typeof highlightStyles>;

const Highlight = ({ className, color, ...props }: HighlightProps) => (
  <mark className={cx(highlightStyles({ color }), className)} {...props} />
);

const curiousStyles = cx(
  "font-black italic text-yellow-dark drop-shadow-depth-2",
  "[-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:var(--color-black)]"
);

type WaveWordProps = { children: string; className?: string };

const WaveWord = ({ children, className }: WaveWordProps) => (
  <em className={className}>
    {/* Split into letters for the wave, so the word is exposed once to assistive tech instead. */}
    <span className="sr-only">{children}</span>
    <span aria-hidden="true">
      {[...children].map((letter, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: the letters never reorder.
          key={index}
          className="inline-block motion-safe:animate-wave"
          style={{ "--wave-index": index } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </span>
  </em>
);

const introCopyStyles = cx(
  "heading-4 mx-auto max-w-320 text-center max-lg:leading-48 md:max-w-600 lg:max-w-720",
  "animate-intro-rise animation-delay-120"
);

type IntroImageProps = { src: StaticImageData; alt: string; className: string };

// The photos stand in for words, so each one's alt text is the word it replaces.
const IntroImage = ({ src, alt, className }: IntroImageProps) => (
  <Image
    src={src}
    alt={alt}
    sizes="80px"
    loading="eager"
    // Cut-outs, so a blur placeholder would show as a smudge around the shape.
    placeholder="empty"
    className={cx("inline-block w-auto align-middle drop-shadow-soft animate-intro-pop animation-delay-120", className)}
  />
);

// `scale` and `rotate` sit on the link, so they compose with the photo's own tilt and intro pop.
const introLinkStyles = cx(
  "inline-block rounded-sm align-middle",
  "transition-[scale,rotate] duration-200 ease-pop motion-reduce:transition-none",
  "hover:scale-115 hover:rotate-6 focus-visible:scale-115 focus-visible:rotate-6 active:scale-90",
  "focus-visible:outline-hidden"
);

type IntroLinkProps = { href: string; children: React.ReactNode };

// The link's name comes from the alt text of the photos inside it.
const IntroLink = ({ href, children }: IntroLinkProps) => (
  <BaseLink href={href} className={introLinkStyles}>
    {children}
  </BaseLink>
);

export const Hero = () => {
  return (
    // `data-navbar-boundary` keeps the revealed navbar off the hero, see `nav/navbar.tsx`.
    <section
      data-navbar-boundary
      className="overflow-clip border-b-2 border-black bg-green-dark pt-64 pb-64 md:pt-48 lg:pt-64 lg:pb-80"
    >
      <div className="flex flex-col items-center gap-48 lg:gap-64">
        <Wordmark
          {...NAME_WORDMARK}
          stacked
          drift
          slideOnScroll
          bendOnScroll
          repeated
          // biome-ignore lint/a11y/useHeadingContent: the rule cannot see the words Wordmark renders into it.
          render={<h1 />}
          className={wordmarkStyles}
        />

        <Container className="px-(--page-side-spacing)">
          <p className={introCopyStyles}>
            {/* TODO: replace the placeholder hrefs with the real destinations. */}
            I'm{" "}
            <IntroLink href="#">
              <IntroImage src={face} alt="Alex" className="h-37 -rotate-7 lg:h-53" />{" "}
              <IntroImage src={bread} alt="Pagnotta" className="h-22 rotate-27 lg:h-31" />
            </IntroLink>{" "}
            welcome to my little <Highlight>DIGITAL PLACE</Highlight> here I share my{" "}
            <Highlight color="black">DEV</Highlight> work,{" "}
            <IntroLink href="#">
              <IntroImage src={camera} alt="photos" className="h-34 rotate-4 lg:h-48" />
            </IntroLink>
            , thoughts,{" "}
            <IntroLink href="#">
              <IntroImage src={printer} alt="things I make" className="h-40 -rotate-5 lg:h-71" />
            </IntroLink>{" "}
            and whatever I am <WaveWord className={curiousStyles}>CURIOUS</WaveWord> about.
          </p>
        </Container>
      </div>
    </section>
  );
};
