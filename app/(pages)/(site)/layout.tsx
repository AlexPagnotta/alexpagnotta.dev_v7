import { Footer } from "@/app/features/nav/footer";
import { Header } from "@/app/features/nav/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
