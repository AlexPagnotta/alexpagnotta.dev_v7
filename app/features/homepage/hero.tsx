import type { StaticImageData } from "next/image";
import type * as React from "react";
import bread from "@/app/features/homepage/assets/bread.png";
import camera from "@/app/features/homepage/assets/camera.png";
import face from "@/app/features/homepage/assets/face.png";
import printer from "@/app/features/homepage/assets/printer.png";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { Container } from "@/app/features/ui/container";
import { Image } from "@/app/features/ui/image";
import { Wordmark } from "@/app/features/ui/wordmark";
import { NAME_WORDMARK } from "@/app/features/utils/config";

const wordmarkStyles = cx("[--wordmark-fill:var(--gradient-green)]", "animate-intro-rise animation-delay-60");

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

const introCopyStyles = cx(
  "heading-4 mx-auto max-w-320 text-center max-lg:leading-48 md:max-w-416 lg:max-w-720",
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

export const Hero = () => {
  return (
    // `data-navbar-boundary` keeps the revealed navbar off the hero, see `nav/navbar.tsx`.
    <section data-navbar-boundary className="border-b-2 border-black bg-green-dark pt-48 pb-64 lg:pt-64 lg:pb-80">
      <div className="flex flex-col items-center gap-48 lg:gap-64">
        {/* biome-ignore lint/a11y/useHeadingContent: the rule cannot see the words Wordmark renders into it. */}
        <Wordmark {...NAME_WORDMARK} stacked repeated render={<h1 />} className={wordmarkStyles} />

        <Container className="px-(--page-side-spacing)">
          <p className={introCopyStyles}>
            I'm <IntroImage src={face} alt="Alex" className="h-37 -rotate-7 lg:h-53" />{" "}
            <IntroImage src={bread} alt="Pagnotta" className="h-22 rotate-27 lg:h-31" /> welcome to my little{" "}
            <Highlight>DIGITAL PLACE</Highlight> here I share my <Highlight color="black">DEV</Highlight> work,{" "}
            <IntroImage src={camera} alt="photos" className="h-34 rotate-4 lg:h-48" />, thoughts,{" "}
            <IntroImage src={printer} alt="things I make" className="h-40 -rotate-5 lg:h-71" /> and whatever I am{" "}
            <em className={curiousStyles}>CURIOUS</em> about.
          </p>
        </Container>
      </div>
    </section>
  );
};
