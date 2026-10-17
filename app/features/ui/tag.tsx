import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";

const tagStyles = cva({
  base: "inline-flex items-center justify-center gap-8 whitespace-nowrap border-black bg-white text-black",
  variants: {
    shape: {
      rounded: "rounded-xs",
      pill: "rounded-full",
    },
    // Named by the desktop size and fixing its height, like Button's; `md` steps down on phones.
    size: {
      sm: "border px-8 h-26 label-1",
      md: "border px-16 h-52 body-1 lg:h-56 lg:body-3",
    },
  },
  defaultVariants: {
    shape: "pill",
    size: "sm",
  },
});

type TagVariants = VariantProps<typeof tagStyles>;

export type TagProps = useRender.ComponentProps<"span"> & TagVariants;

export const Tag = ({ className, shape, size, render, ...props }: TagProps) => {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">({ className: cx(tagStyles({ shape, size }), className) }, props),
  });
};
