import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  The tilted category tag shared by every stream card. Positioning is owned by
  CardLayout — this only carries the pill's look and color.
*/
const cardLabelStyles = cva({
  base: "body-3 inline-block -rotate-3 rounded-sm px-12 py-4 font-black uppercase",
  variants: {
    color: {
      magenta: "bg-magenta text-white",
      green: "bg-green text-white",
      yellow: "bg-yellow text-black",
      cyan: "bg-cyan text-black",
    },
  },
});

export type CardLabelProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof cardLabelStyles>;

export const CardLabel = ({ className, color, ...props }: CardLabelProps) => {
  return <span className={cx(cardLabelStyles({ color }), className)} {...props} />;
};

/*
  Shared frame for every stream card: a bordered container plus the tilted
  category label that tucks behind it. The label lives inside the wrapper's top
  padding rather than overflowing above the card, so a CSS multi-column masonry
  doesn't clip it (only the first column renders overflow above its top edge).
  The container sits at z-10 above the label, so only the label's text shows
  above the card's top edge. Callers pass the label element and the card body via
  `children`, and extend the container (background, padding, aspect ratio)
  through `className`.
*/

export type CardLayoutProps = {
  label: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const CardLayout = ({ label, className, children }: CardLayoutProps) => {
  return (
    <article className="relative isolate pt-40">
      <div className="absolute -left-12 top-0">{label}</div>
      <div className={cx("relative z-10 rounded-md border-2 border-black", className)}>{children}</div>
    </article>
  );
};
