# Roadmap

Ordered list of remaining work before launch. Roughly sequenced content/copy → layout/interaction polish → media pipeline → technical/SEO setup → migration → deploy, since later items depend on earlier ones settling first.

## 1. Content & copy

- [ ] **Hero** — write final copy; design and add the sticker element (rotating shape) with its accompanying text.
- [ ] **Marquees** — write final copy for both the personal and topic marquees.
- [ ] **About me** — write final copy; redesign layout; add images next to the title and in the current placeholder slots.
- [ ] **Footer** — write final copy; wire "let's connect" to open an email link; add social links and a CV download link.

## 2. Header

- [x] On mobile, hide the "Stream" and "About me" nav links.
- [x] On desktop, those links should scroll to their homepage sections instead of navigating to separate pages.
- [x] "Say hi" should scroll to the footer section.

## 3. Stream section

- [ ] Add a work/personal filter, backed by a new frontmatter field on content markdown to tag each entry.
- [ ] Add hover animations to cards.
- [x] Support a per-project custom color for the title label.
- [ ] Improve overall spacing, especially on mobile.

## 4. Blog & project pages

- [ ] Improve MDX-rendered content spacing on both project and blog pages.
- [ ] Rework the blog post header layout — current structure looks off and needs adjustment.

## 5. Media pipeline

- [ ] Optimize images: correct sizes, quality, and loading strategy (e.g. lazy-loading, responsive `srcset`).
- [ ] Optimize videos with appropriate encoding settings.
- [ ] Add an npm script that runs ffmpeg to auto-convert source videos into the optimized format.

## 6. SEO & metadata

- [ ] Add full SEO config: meta tags, Open Graph/social share image, favicons, JSON-LD structured data, and any LLM-search-facing metadata (e.g. `llms.txt`).

## 7. Migration

- [ ] Migrate remaining content from the old site.

## 8. Deploy

- [x] Install and configure Vercel Analytics (`@vercel/analytics`).
- [x] Deploy to Next.js hosting (production release).
