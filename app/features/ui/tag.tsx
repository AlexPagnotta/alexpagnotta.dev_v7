import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Tags are labels, not controls: no shadow, and the first tag in a group takes the
  `rounded` shape while the rest are pills. Like Button, each size sets its height
  outright: deriving it from the label's line box left it on a fraction of a pixel and
  tied the pill to whatever leading the type step happened to carry.
*/

const tagStyles = cva({
  base: "inline-flex items-center justify-center gap-8 whitespace-nowrap border-black bg-white text-black",
  variants: {
    shape: {
      rounded: "rounded-md",
      pill: "rounded-full",
    },
    size: {
      sm: "border px-16 h-34 body-2",
      md: "border-2 px-16 h-44 body-3 lg:px-24 lg:h-56",
    },
  },
  defaultVariants: {
    shape: "pill",
    size: "sm",
  },
});

export type TagVariants = VariantProps<typeof tagStyles>;
export type TagShape = NonNullable<TagVariants["shape"]>;
export type TagSize = NonNullable<TagVariants["size"]>;

export type TagProps = useRender.ComponentProps<"span"> & TagVariants;

export const Tag = ({ className, shape, size, render, ...props }: TagProps) => {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">({ className: cx(tagStyles({ shape, size }), className) }, props),
  });
};
