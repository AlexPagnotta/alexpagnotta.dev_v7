import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { Image, type ImageProps } from "@/app/features/ui/image";

/*
  Every card in the design shares this shell; the layout defaults below are the post
  card's. Custom cards override padding, gap and alignment, and place their own children
  against the shell's `relative` — a pinned tag row, a rotated image bleeding out.
*/
// Shared so CustomBody's `cardSpacing` lines up with the shell's own padding exactly.
const cardPaddingStyles = "p-24 pb-32";

// `isolate`: CustomBody's z-index has to stay inside the card, or it paints over the navbar.
const cardStyles = cx(
  "relative isolate flex w-full flex-col items-start gap-24 rounded-lg border-2 border-black bg-white shadow-depth-md",
  cardPaddingStyles
);

export type CardProps = useRender.ComponentProps<"div">;

const CardRoot = ({ className, render, ...props }: CardProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(cardStyles, className) }, props),
  });
};

export type CardHeaderProps = useRender.ComponentProps<"div">;

/** Tags and title as one block, tighter than the card's own gap. */
const CardHeader = ({ className, render, ...props }: CardHeaderProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx("flex w-full flex-col gap-12", className) }, props),
  });
};

export type CardTitleProps = useRender.ComponentProps<"p">;

/** Typography comes from the caller, like every other primitive. */
const CardTitle = ({ className, render, ...props }: CardTitleProps) => {
  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">({ className: cx(className) }, props),
  });
};

const cardTagsStyles = cva({
  // Adjacent tags share a border edge in the design, hence the 1px overlap.
  base: "flex w-full items-center -space-x-1",
  variants: {
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

export type CardTagsVariants = VariantProps<typeof cardTagsStyles>;
export type CardTagsAlign = NonNullable<CardTagsVariants["align"]>;

export type CardTagsProps = useRender.ComponentProps<"div"> & CardTagsVariants;

const CardTags = ({ className, align, render, ...props }: CardTagsProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(cardTagsStyles({ align }), className) }, props),
  });
};

const cardCustomBodyStyles = cva({
  base: "absolute inset-0 z-10",
  variants: {
    // On, the overlay's children line up with the card's content box instead of its edges.
    cardSpacing: {
      true: cardPaddingStyles,
      false: "",
    },
  },
  defaultVariants: {
    cardSpacing: false,
  },
});

export type CardCustomBodyVariants = VariantProps<typeof cardCustomBodyStyles>;

export type CardCustomBodyProps = useRender.ComponentProps<"div"> & CardCustomBodyVariants;

/**
 * Free-form overlay for cards that place their own art: it fills the card and paints
 * over the title and tags, leaving the caller to position whatever it holds.
 */
const CardCustomBody = ({ className, cardSpacing, render, ...props }: CardCustomBodyProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(cardCustomBodyStyles({ cardSpacing }), className) }, props),
  });
};

/** `className` frames the image; the image itself always covers that frame. */
export type CardImageProps = ImageProps;

const CardImage = ({ className, ...props }: CardImageProps) => (
  <div className={cx("h-280 w-full shrink-0 overflow-hidden rounded-md border border-black bg-grey-2", className)}>
    <Image {...props} className="size-full object-cover" />
  </div>
);

export const Card = Object.assign(CardRoot, {
  CustomBody: CardCustomBody,
  Header: CardHeader,
  Image: CardImage,
  Tags: CardTags,
  Title: CardTitle,
});
