import { Marquee } from "@/app/features/ui/marquee";

const MARQUEE_TEXT = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Marquee size="sm" text={MARQUEE_TEXT} separator="•" />
      <main className="flex flex-col">{children}</main>
      <footer className="h-762 w-full bg-grey-1 lg:h-786" />
    </>
  );
}
