import { cx } from "@/app/features/style/utils";

export type FitTextProps = {
  children: string;
  className?: string;
};

/*
  Scales a single line of text to exactly fill its container. The hidden copy is
  what gets measured at the reference size — see fit-text.css for the mechanism.
  Font family, weight and tracking are inherited, so both copies stay in sync;
  any font-size coming in is overridden by the fit.
*/
export const FitText = ({ children, className }: FitTextProps) => {
  return (
    <span className={cx("fit-text", className)}>
      <span className="fit-text-available">
        <span className="fit-text-natural">
          <span aria-hidden="true" className="fit-text-ghost">
            {children}
          </span>
          <span className="fit-text-measure">
            <span className="fit-text-value">{children}</span>
          </span>
        </span>
      </span>
    </span>
  );
};
