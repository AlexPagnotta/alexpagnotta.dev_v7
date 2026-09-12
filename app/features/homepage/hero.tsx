import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { Container } from "@/app/features/ui/container";

const highlightStyles = cva({
  // Inline, so the pill takes its height from the line's own content box and never shifts the copy.
  // `text-black` is explicit because the UA paints `mark` with the system `marktext` colour.
  base: "rounded-md border border-black px-8 text-black whitespace-nowrap",
  variants: {
    color: {
      "grey-1": "bg-grey-1",
      "yellow-1": "bg-yellow-1",
      black: "bg-black text-grey-1",
    },
  },
  defaultVariants: {
    color: "grey-1",
  },
});

type HighlightProps = React.ComponentProps<"mark"> & VariantProps<typeof highlightStyles>;

const Highlight = ({ className, color, ...props }: HighlightProps) => (
  <mark className={cx(highlightStyles({ color }), className)} {...props} />
);

export const Hero = () => {
  return (
    // Padding is symmetric while the ALEX PAGNOTTA title is missing; the design pads only the bottom.
    // `data-navbar-boundary` keeps the revealed navbar off the hero, see `nav/navbar.tsx`.
    <section data-navbar-boundary className="border-b-2 border-black bg-green-1 py-120">
      <Container className="px-(--page-side-spacing)">
        <p className="headline-4 text-balance text-center">
          I'M <Highlight color="grey-1">ALEX</Highlight> WELCOME TO MY LITTLE{" "}
          <Highlight color="yellow-1">DIGITAL PLACE.</Highlight> HERE I SHARE MY{" "}
          <Highlight color="black">DEV</Highlight> WORK, THOUGHTS, PHOTOS, THINGS I MAKE, AND WHATEVER I HAPPEN TO BE{" "}
          <em className="font-black">CURIOUS</em> ABOUT.
        </p>
      </Container>
    </section>
  );
};
