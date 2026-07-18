import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const noteStyles = cva({
  base: "body-1 rounded-md border-2 border-black p-16 shadow-depth-sm",
  variants: {
    variant: {
      yellow: "bg-yellow",
      cyan: "bg-cyan",
      green: "bg-green",
      magenta: "bg-magenta",
    },
  },
  defaultVariants: {
    variant: "yellow",
  },
});

export type NoteProps = { children: React.ReactNode } & VariantProps<typeof noteStyles>;

export const Note = ({ children, variant }: NoteProps) => (
  <aside className={cx(noteStyles({ variant }), "text-black")}>{children}</aside>
);
