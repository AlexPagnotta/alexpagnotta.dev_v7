import { Footer } from "@/app/features/nav/footer";
import { Header } from "@/app/features/nav/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full scroll-smooth flex-col overflow-y-auto scrollbar-thumb-black">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
