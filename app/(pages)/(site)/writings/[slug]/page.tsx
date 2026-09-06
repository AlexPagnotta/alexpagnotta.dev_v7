import { pageMetadata } from "@/app/features/seo/metadata";

type Props = PageProps<"/writings/[slug]">;

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return pageMetadata({ title: slug, path: `/writings/${slug}`, type: "article" });
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto flex w-full max-w-1200 flex-col gap-24 px-24 py-96">
      <h1 className="headline-1">Writing</h1>
      <p className="body-3">{slug}</p>
    </div>
  );
}
