import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const proseStyles = cva({
  base: [
    "flex flex-col gap-24",
    // Colocated media renders inside a <figure>; alternate a slight tilt per image.
    "[&_figure:nth-of-type(odd)]:rotate-2 [&_figure:nth-of-type(even)]:-rotate-2",
  ],
  variants: {
    tone: {
      onLight: "text-black [&_figure]:border-4 [&_figure]:border-black",
      onDark: "text-cream [&_figure]:border-8 [&_figure]:border-white",
    },
  },
  defaultVariants: {
    tone: "onLight",
  },
});

export type ProseProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof proseStyles>;

export const Prose = ({ children, className, tone }: ProseProps) => (
  <div className={cx(proseStyles({ tone }), className)}>{children}</div>
);
