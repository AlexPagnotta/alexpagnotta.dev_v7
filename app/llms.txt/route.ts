import { getAllEntries } from "@/app/features/content/loader";
import { siteConfig } from "@/app/features/seo/config";

// Serves /llms.txt — a plain-markdown map of the site for LLM-based search and agents,
// following the https://llmstxt.org convention. Generated from the same content loader
// that drives the sitemap so it never drifts from what is actually published.
export function GET() {
  const line = (title: string, href: string, desc?: string) =>
    `- [${title}](${siteConfig.url}${href})${desc ? `: ${desc}` : ""}`;

  const projects = getAllEntries("project").map((e) => line(e.title, `/projects/${e.slug}`, e.description));
  const posts = getAllEntries("blog").map((e) => line(e.title, `/blog/${e.slug}`, e.description));

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Projects",
    "",
    ...(projects.length ? projects : ["- _None published yet._"]),
    "",
    "## Writing",
    "",
    ...(posts.length ? posts : ["- _None published yet._"]),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
