import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const containerStyles = cva({
  base: "mx-auto w-full max-w-(--container-max-w)",
  variants: {
    size: {
      md: "[--container-max-w:--spacing(900)]",
      lg: "[--container-max-w:--spacing(1200)]",
    },
    enableMdMaxWidth: {
      true: "md:max-w-600 lg:max-w-(--container-max-w)",
      false: "",
    },
  },
  defaultVariants: {
    size: "lg",
    enableMdMaxWidth: false,
  },
});

export type ContainerProps = useRender.ComponentProps<"div"> & VariantProps<typeof containerStyles>;

export const Container = ({ className, size, enableMdMaxWidth, render, ...props }: ContainerProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(containerStyles({ size, enableMdMaxWidth }), className) }, props),
  });
};
