import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { Image, type ImageProps } from "@/app/features/ui/image";

// The layout defaults are the post card's; custom cards override them and position against the shell's `relative`.
// Shared so CustomBody's `cardSpacing` lines up with the shell's own padding exactly.
const cardPaddingStyles = "p-20";

// `isolate`: CustomBody's z-index has to stay inside the card, or it paints over the navbar.
const cardStyles = cx(
  "relative isolate flex w-full flex-col items-start gap-16 rounded-xl border border-black bg-white",
  "shadow-depth-6 shadow-black/4",
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
    props: mergeProps<"div">({ className: cx("flex w-full flex-col gap-8", className) }, props),
  });
};

export type CardTitleProps = useRender.ComponentProps<"p">;

const CardTitle = ({ className, render, ...props }: CardTitleProps) => {
  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">({ className }, props),
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

type CardTagsVariants = VariantProps<typeof cardTagsStyles>;

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

type CardCustomBodyVariants = VariantProps<typeof cardCustomBodyStyles>;

export type CardCustomBodyProps = useRender.ComponentProps<"div"> & CardCustomBodyVariants;

/** Fills the card over its title and tags, for cards that place their own art. */
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
  <div className={cx("h-224 w-full shrink-0 overflow-hidden rounded-md bg-gray-300", className)}>
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
