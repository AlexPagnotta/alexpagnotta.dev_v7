import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { pageMetadata } from "@/app/features/seo/metadata";

type Props = PageProps<"/writings/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("writing").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("writing", slug);
  return pageMetadata({ title, description, path: `/writings/${slug}`, type: "article" });
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  const { default: Writing } = await import(`@/content/writings/${slug}/index.mdx`);

  return (
    <article>
      <h1>{entry.title}</h1>
      <p>{entry.date.toISOString().slice(0, 10)}</p>
      <Writing />
    </article>
  );
}
