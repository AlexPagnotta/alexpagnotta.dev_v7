import { cx } from "@/app/features/style/utils";

export type CardLayoutProps = {
  label: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/*
  File is called "card-layout" and not "layout.tsx" as it would conflict with nextjs's layout component.
*/

export const CardLayout = ({ label, className, children }: CardLayoutProps) => {
  return (
    <article className="relative isolate pt-40">
      <div className="absolute -left-12 top-0">{label}</div>
      <div className={cx("relative z-10 rounded-md border-2 border-black", className)}>{children}</div>
    </article>
  );
};
