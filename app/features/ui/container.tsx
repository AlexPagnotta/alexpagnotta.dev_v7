import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Centers content and caps its width. Max widths are in rem so the measure grows
  with the user's font-size preference. Use `render` to swap the element, e.g.
  `render={<main />}`.
*/

const containerStyles = cva({
  base: "mx-auto w-full",
  variants: {
    size: {
      md: "max-w-900",
      lg: "max-w-1200",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ContainerProps = useRender.ComponentProps<"div"> & VariantProps<typeof containerStyles>;

export const Container = ({ className, size, render, ...props }: ContainerProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(containerStyles({ size }), className) }, props),
  });
};
