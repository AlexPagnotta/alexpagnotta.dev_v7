import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Tags are labels, not controls: no shadow, and the first tag in a group takes the
  `rounded` shape while the rest are pills. Like Button, the height comes out of the
  label's line box plus padding and border rather than being set.
*/

const tagStyles = cva({
  base: "inline-flex items-center justify-center gap-8 whitespace-nowrap border-black bg-white text-black",
  variants: {
    shape: {
      rounded: "rounded-md",
      pill: "rounded-full",
    },
    size: {
      sm: "border px-16 py-0 body-2",
      md: "border-2 px-16 py-4 body-3 lg:px-24 lg:py-8",
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
