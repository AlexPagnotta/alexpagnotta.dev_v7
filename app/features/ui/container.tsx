import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const containerStyles = cva({
  base: "mx-auto w-full max-w-(--container-max-w)",
  variants: {
    size: {
      sm: "[--container-max-w:var(--content-sm)]",
      md: "[--container-max-w:var(--content-md)]",
      lg: "[--container-max-w:var(--content-lg)]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ContainerVariants = VariantProps<typeof containerStyles>;
export type ContainerSize = NonNullable<ContainerVariants["size"]>;

export type ContainerProps = useRender.ComponentProps<"div"> & ContainerVariants;

export const Container = ({ className, size, render, ...props }: ContainerProps) => {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cx(containerStyles({ size }), className) }, props),
  });
};
