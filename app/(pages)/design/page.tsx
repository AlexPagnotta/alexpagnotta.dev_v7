import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cx } from "@/app/features/style/utils";
import { Button } from "@/app/features/ui/button";
import { Link } from "@/app/features/ui/link";
import { Select } from "@/app/features/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/app/features/ui/toggle-group";
import { isProduction } from "@/app/features/utils/release-channel";

export const metadata: Metadata = {
  title: "Design",
  robots: { index: false, follow: false },
};

type TypeStyle = {
  name: string;
  utility: string;
  specs: string;
  sample: string;
  stacked?: boolean;
  multiline?: boolean;
};

const MULTILINE_SAMPLE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const TYPE_STYLES: TypeStyle[] = [
  {
    name: "Display",
    utility: "display",
    specs: "120 / 48 px · Black · 1.3 · -0.02em",
    sample: "Lorem Ipsum Dolor",
    stacked: true,
  },
  {
    name: "Title 1",
    utility: "title-1",
    specs: "72 / 36 px · Regular · 1.25 · -0.06em",
    sample: "Lorem Ipsum Dolor",
    stacked: true,
  },
  {
    name: "Title 2",
    utility: "title-2",
    specs: "44 / 28 px · Regular · 1.2 · -0.05em",
    sample: "Lorem Ipsum Dolor",
    stacked: true,
  },
  {
    name: "Title 3",
    utility: "title-3",
    specs: "36 / 24 px · Regular · 1.15",
    sample: "Lorem Ipsum Dolor",
    stacked: true,
  },
  {
    name: "Body 3",
    utility: "body-3",
    specs: "24 / 20 px · Regular · 1.12 · -0.03em",
    sample: MULTILINE_SAMPLE,
    multiline: true,
  },
  {
    name: "Body 2",
    utility: "body-2",
    specs: "24 / 18 px · Regular · 1.1",
    sample: MULTILINE_SAMPLE,
    multiline: true,
  },
  {
    name: "Body 1",
    utility: "body-1",
    specs: "16 / 16 px · Regular · 1.6",
    sample: MULTILINE_SAMPLE,
    multiline: true,
  },
  {
    name: "Caption",
    utility: "caption",
    specs: "14 / 12 px · Regular · 1.05",
    sample: MULTILINE_SAMPLE,
    multiline: true,
  },
];

type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Section = ({ title, description, children }: SectionProps) => (
  <section className="flex flex-col gap-24">
    <div className="flex flex-col gap-8">
      <h2 className="title-3">{title}</h2>
      {description ? <p className="caption max-w-600 text-black/50">{description}</p> : null}
    </div>
    {children}
  </section>
);

type RowProps = {
  label: string;
  children: React.ReactNode;
};

const Row = ({ label, children }: RowProps) => (
  <div className="flex flex-col gap-16 border-t border-black/10 py-40 md:flex-row md:gap-48">
    <p className="caption shrink-0 font-black tracking-wide uppercase md:w-240">{label}</p>
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-16">{children}</div>
  </div>
);

const DesignPage = () => {
  if (isProduction) {
    notFound();
  }

  return (
    <main className="h-full overflow-y-auto bg-white text-black scrollbar-thumb-black">
      <div className="mx-auto flex max-w-1200 flex-col gap-80 px-24 py-80">
        <header className="flex flex-col gap-16">
          <p className="body-3 text-magenta">DESIGN SYSTEM</p>
          <h1 className="title-1">Components &amp; type</h1>
          <p className="body-2 max-w-600 text-black/60">
            The building blocks of the site, sourced from Figma. Type styles map to Tailwind utilities; components live
            in <code>app/features/ui</code>.
          </p>
        </header>

        <Section
          title="Typography"
          description="Sizes read as desktop / mobile and switch at the lg breakpoint (1024px) — resize to preview."
        >
          <div className="flex flex-col">
            {TYPE_STYLES.map((style) => (
              <article
                key={style.utility}
                className={cx(
                  "flex flex-col gap-16 border-t border-black/10 py-40",
                  !style.stacked && "md:flex-row md:gap-48"
                )}
              >
                <div className={cx("flex shrink-0 flex-col gap-4", !style.stacked && "md:w-240")}>
                  <p className="caption font-black tracking-wide uppercase">{style.name}</p>
                  <p className="caption text-magenta">.{style.utility}</p>
                  <p className="caption text-black/50">{style.specs}</p>
                </div>
                <div className={cx("min-w-0 flex-1", !style.multiline && "overflow-x-auto")}>
                  <p className={cx(style.utility, style.multiline ? "max-w-600" : "whitespace-nowrap")}>
                    {style.sample}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Buttons" description="Native button with solid color variants (no hover) and two sizes.">
          <Row label="Colors">
            <Button variant="green">Green</Button>
            <Button variant="yellow">Yellow</Button>
            <Button variant="magenta">Magenta</Button>
            <Button variant="cyan">Cyan</Button>
          </Row>
          <Row label="Sizes">
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
          </Row>
          <Row label="Disabled">
            <Button disabled>Disabled</Button>
          </Row>
        </Section>

        <Section
          title="Toggle group"
          description="Segmented single-select control (Base UI). Shares the button sizes and color variants — the pressed item fills with the variant color."
        >
          <Row label="Medium · green">
            <ToggleGroup defaultValue={["everything"]}>
              <ToggleGroupItem value="everything">Everything</ToggleGroupItem>
              <ToggleGroupItem value="dev-ai">Dev / AI</ToggleGroupItem>
              <ToggleGroupItem value="personal">Personal</ToggleGroupItem>
            </ToggleGroup>
          </Row>
          <Row label="Small · magenta">
            <ToggleGroup size="sm" variant="magenta" defaultValue={["everything"]}>
              <ToggleGroupItem value="everything">Everything</ToggleGroupItem>
              <ToggleGroupItem value="dev-ai">Dev / AI</ToggleGroupItem>
              <ToggleGroupItem value="personal">Personal</ToggleGroupItem>
            </ToggleGroup>
          </Row>
        </Section>

        <Section
          title="Select"
          description="Base UI select — the chosen option stays shown in the trigger and marked in the list. Shares the button sizes and color variants (highlight color)."
        >
          <Row label="Medium · green">
            <Select
              aria-label="View"
              defaultValue="split"
              items={[
                { label: "Split", value: "split" },
                { label: "Grid", value: "grid" },
                { label: "List", value: "list" },
              ]}
            />
          </Row>
          <Row label="Small · cyan">
            <Select
              aria-label="Sort"
              size="sm"
              variant="cyan"
              defaultValue="newest"
              items={[
                { label: "Newest", value: "newest" },
                { label: "Oldest", value: "oldest" },
                { label: "Popular", value: "popular" },
              ]}
            />
          </Row>
        </Section>

        <Section title="Links" description="Anchor built on next/link with cva variants.">
          <Row label="Variants">
            <Link href="#" variant="nav">
              The stream
            </Link>
          </Row>
        </Section>
      </div>
    </main>
  );
};

export default DesignPage;
