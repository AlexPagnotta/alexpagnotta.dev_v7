import { cx } from "@/app/features/style/utils";

type Axes = Record<string, readonly string[]>;

/** Every combination of the given axes, in declaration order. */
const cross = (axes: Axes) =>
  Object.entries(axes).reduce<Record<string, string>[]>(
    (rows, [key, values]) => rows.flatMap((row) => values.map((value) => ({ ...row, [key]: value }))),
    [{}]
  );

export type MatrixProps<T extends Axes> = {
  axes: T;
  children: (props: { [K in keyof T]: T[K][number] }) => React.ReactNode;
  className?: string;
};

/**
 * Renders the labelled cross product of a component's variant axes, grouped by the
 * first axis. Adding a variant to a cva means adding one string to the call site.
 */
export const Matrix = <T extends Axes>({ axes, children, className }: MatrixProps<T>) => {
  const allAxes: Axes = axes;
  const [groupKey, ...cellKeys] = Object.keys(allAxes);
  const groups = allAxes[groupKey];
  const cellAxes = Object.fromEntries(cellKeys.map((key) => [key, allAxes[key]]));

  return (
    <div className={cx("flex flex-col gap-32", className)}>
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-16">
          <Label>
            {groupKey}: {group}
          </Label>
          <div className="flex flex-wrap items-end gap-x-24 gap-y-32">
            {cross(cellAxes).map((cell) => {
              const props = { ...cell, [groupKey]: group };

              return (
                <div key={JSON.stringify(cell)} className="flex flex-col items-start gap-8">
                  {cellKeys.length > 0 && <Label>{cellKeys.map((key) => cell[key]).join(" · ")}</Label>}
                  {children(props as { [K in keyof T]: T[K][number] })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cx("body-1 text-black/50", className)}>{children}</span>
);

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-32 border-t-2 border-black pt-32">
    <h2 className="headline-3">{title}</h2>
    {children}
  </section>
);

export const Subsection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-24">
    <h3 className="body-4">{title}</h3>
    {children}
  </div>
);
