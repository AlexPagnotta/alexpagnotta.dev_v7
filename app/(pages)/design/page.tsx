import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cx } from "@/app/features/style/cva";
import { Button, ButtonLink } from "@/app/features/ui/button";
import { Card } from "@/app/features/ui/card";
import { Container, type ContainerSize } from "@/app/features/ui/container";
import { Marquee } from "@/app/features/ui/marquee";
import { Tag } from "@/app/features/ui/tag";
import { isProduction } from "@/app/features/utils/release-channel";
import { Label, Matrix, Section, Subsection } from "./harness";

export const metadata: Metadata = {
  title: "Design",
  robots: { index: false, follow: false },
};

const NEUTRALS = [
  { name: "white", className: "bg-white", hex: "#ffffff" },
  { name: "black", className: "bg-black", hex: "#0c0c0c" },
  { name: "gray-100", className: "bg-gray-100", hex: "#f2f2f2" },
  { name: "gray-200", className: "bg-gray-200", hex: "#e5e5e5" },
  { name: "gray-300", className: "bg-gray-300", hex: "#d9d9d9" },
] as const;

const ACCENTS = [
  { name: "green-dark", className: "bg-green-dark", hex: "#33cc92" },
  { name: "yellow-dark", className: "bg-yellow-dark", hex: "#ffd435" },
  { name: "pink-dark", className: "bg-pink-dark", hex: "#ff99e2" },
  { name: "green-light", className: "bg-green-light", hex: "#5cffa0" },
  { name: "yellow-light", className: "bg-yellow-light", hex: "#fff352" },
  { name: "pink-light", className: "bg-pink-light", hex: "#ffb3e9" },
] as const;

const GRADIENTS = [
  { name: "gradient-green", className: "bg-(image:--gradient-green)", hex: "white 25% → #97ebcb" },
  { name: "gradient-yellow", className: "bg-(image:--gradient-yellow)", hex: "white → #ffe688 · 50%" },
  { name: "gradient-pink", className: "bg-(image:--gradient-pink)", hex: "white → #ffccf0 · 50%" },
] as const;

const DISPLAY_SAMPLE = "Title";
const SHORT_SAMPLE = "Lorem Ipsum Dolor";
const LONG_SAMPLE = "Duis cillum in ea ut non duis mollit incididunt laborum voluptate nulla.";

const TYPE_STYLES = [
  { utility: "display-1", specs: "220 / 120 px · Black", sample: DISPLAY_SAMPLE },
  { utility: "logo", specs: "24 / 20 px · Regular", sample: "ALEX PAGNOTTA" },
  { utility: "heading-1", specs: "80 / 48 px · Regular", sample: SHORT_SAMPLE },
  { utility: "heading-2", specs: "64 / 40 px · Regular", sample: SHORT_SAMPLE },
  { utility: "heading-3", specs: "40 / 28 px · Regular", sample: SHORT_SAMPLE },
  { utility: "heading-4", specs: "32 / 24 px · Regular", sample: SHORT_SAMPLE },
  { utility: "body-4", specs: "26 px · Regular", sample: LONG_SAMPLE },
  { utility: "body-3", specs: "20 px · Regular", sample: LONG_SAMPLE },
  { utility: "body-2", specs: "18 px · Regular", sample: LONG_SAMPLE },
  { utility: "body-1", specs: "16 px · Regular", sample: LONG_SAMPLE },
  { utility: "label-2", specs: "14 px · Regular", sample: LONG_SAMPLE },
  { utility: "label-1", specs: "12 px · Regular", sample: LONG_SAMPLE },
] as const;

const SHADOWS = ["shadow-depth-2", "shadow-depth-4", "shadow-depth-6", "shadow-depth-8"] as const;

const PLACEHOLDER_IMAGE = "/assets/placeholder.svg";

const CONTAINERS = [
  { size: "lg", width: "1280px" },
  { size: "md", width: "960px" },
  { size: "sm", width: "720px" },
] as const satisfies readonly { size: ContainerSize; width: string }[];

type SwatchProps = { name: string; className: string; hex: string };

const Swatch = ({ name, className, hex }: SwatchProps) => (
  <div className="flex flex-col gap-8">
    <div className={cx("size-96 rounded-md border-2 border-black", className)} />
    <span className="body-2">{name}</span>
    <Label>{hex}</Label>
  </div>
);

const DesignPage = () => {
  // The sandbox ships with the app but should never be reachable on the live site.
  if (isProduction) notFound();

  return (
    <main className="mx-auto flex w-full max-w-1280 flex-col gap-64 px-(--page-side-spacing) py-64">
      <header className="flex flex-col gap-16">
        <h1 className="heading-1">Design</h1>
        <p className="body-3 max-w-700 text-black/60">
          Every token and UI primitive, rendered through the real app pipeline. Resize the window to check the mobile
          cut of each type style.
        </p>
      </header>

      <Section title="Colors">
        <Subsection title="Neutrals">
          <div className="flex flex-wrap gap-24">
            {NEUTRALS.map((color) => (
              <Swatch key={color.name} {...color} />
            ))}
          </div>
        </Subsection>
        <Subsection title="Accents">
          <div className="flex flex-wrap gap-24">
            {ACCENTS.map((color) => (
              <Swatch key={color.name} {...color} />
            ))}
          </div>
        </Subsection>
        <Subsection title="Gradients">
          <div className="flex flex-wrap gap-24">
            {GRADIENTS.map((color) => (
              <Swatch key={color.name} {...color} />
            ))}
          </div>
        </Subsection>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-32">
          {TYPE_STYLES.map((style) => (
            <div key={style.utility} className="flex flex-col gap-8 border-t border-black/10 pt-16">
              <div className="flex flex-wrap items-baseline gap-x-16">
                <span className="body-2">{style.utility}</span>
                <Label>{style.specs}</Label>
              </div>
              <div className="overflow-x-auto">
                <p className={style.utility}>{style.sample}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-32">
          {SHADOWS.map((shadow) => (
            <div key={shadow} className="flex flex-col gap-8">
              <div className={cx("size-96 rounded-md border-2 border-black bg-white", shadow)} />
              <Label>{shadow}</Label>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <Subsection title="Sizes">
          <Matrix axes={{ size: ["sm", "md", "lg"] } as const}>{(props) => <Button {...props}>Button</Button>}</Matrix>
        </Subsection>

        <Subsection title="Colors">
          <Matrix
            axes={
              {
                color: ["white", "yellow-dark", "green-dark", "pink-dark", "yellow-light", "green-light", "pink-light"],
              } as const
            }
          >
            {(props) => (
              <Button {...props} size="md">
                Button
              </Button>
            )}
          </Matrix>
        </Subsection>

        <Subsection title="Icon only">
          <Matrix axes={{ color: ["white", "yellow-dark"], size: ["icon"] } as const}>
            {(props) => (
              <Button {...props} aria-label="Next">
                <ArrowRight aria-hidden="true" className="size-16" />
              </Button>
            )}
          </Matrix>
        </Subsection>

        <Subsection title="Disabled and link">
          <div className="flex flex-wrap items-center gap-24">
            <Button disabled>Disabled</Button>
            <Button color="yellow-dark" disabled>
              Disabled
            </Button>
            <ButtonLink href="/design">ButtonLink</ButtonLink>
          </div>
        </Subsection>
      </Section>

      <Section title="Container">
        <div className="flex flex-col gap-16">
          {CONTAINERS.map((container) => (
            <Container key={container.size} size={container.size}>
              <div className="flex items-center justify-center rounded-md border-2 border-black bg-gray-100 py-16">
                <Label>
                  {container.size} · {container.width}
                </Label>
              </div>
            </Container>
          ))}
        </div>
      </Section>

      <Section title="Marquee">
        <Subsection title="Small">
          <Marquee size="sm" text={SHORT_SAMPLE} separator="•" className="-mx-24" />
        </Subsection>

        <Subsection title="Big">
          <Marquee size="lg" text="LOREM IPSUM DOLOR" separator="-" className="-mx-24" />
        </Subsection>

        <Subsection title="No separator, paused">
          <Marquee size="sm" text={SHORT_SAMPLE} play={false} className="-mx-24" />
        </Subsection>
      </Section>

      <Section title="Card">
        <Subsection title="Post card">
          <div className="max-w-302">
            <Card>
              <Card.Image src={PLACEHOLDER_IMAGE} alt="" />
              <Card.Header>
                <Card.Tags>
                  <Tag shape="rounded">Writing</Tag>
                  <Tag>AI</Tag>
                  <Tag>Dev</Tag>
                </Card.Tags>
                <Card.Title className="body-3">This is a long title about something I built</Card.Title>
              </Card.Header>
            </Card>
          </div>
        </Subsection>

        <Subsection title="Custom card">
          {/* What a project card composes: the shell re-laid out, its own media, pinned tags. */}
          <div className="max-w-302">
            <Card className="h-288 items-center gap-16 overflow-hidden">
              <Card.Tags align="end">
                <Tag shape="rounded">Work</Tag>
                <Tag>Colorful</Tag>
                <Tag>Wild</Tag>
              </Card.Tags>
              <Card.CustomBody cardSpacing>
                <div className="w-full h-full justify-center content-center">
                  <p className="body-4 text-center">This is a custom title</p>
                </div>
                <div className="absolute left-24 -bottom-16 w-100 h-120 rotate-6 border-black bg-pink-dark" />
              </Card.CustomBody>
            </Card>
          </div>
        </Subsection>
      </Section>

      <Section title="Tag">
        <Subsection title="Shape and size">
          <Matrix axes={{ shape: ["pill", "rounded"], size: ["sm", "md"] } as const}>
            {(props) => <Tag {...props}>Tag</Tag>}
          </Matrix>
        </Subsection>

        <Subsection title="In a group">
          <div className="flex flex-wrap items-center gap-16">
            <Tag shape="rounded">Lorem</Tag>
            <Tag>Ipsum</Tag>
            <Tag>Dolor</Tag>
          </div>
        </Subsection>
      </Section>
    </main>
  );
};

export default DesignPage;
