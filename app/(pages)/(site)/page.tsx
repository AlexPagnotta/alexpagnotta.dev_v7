import { pageMetadata } from "@/app/features/seo/metadata";

export const metadata = pageMetadata({ path: "/", type: "website" });

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-1200 px-24 py-96">
      <h1 className="headline-1">Home</h1>
    </div>
  );
}
