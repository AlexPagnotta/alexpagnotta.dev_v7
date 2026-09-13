# Roadmap

Open items, roughly in the order they block a launch.

## Blocking launch

- [ ] **Site copy.** `title` and `description` in `app/features/seo/config.ts` still read `TODO Dev`.
      They feed the homepage title, the `%s | name` template, every meta description, the OG card
      alt text, the manifest and the RSS channel, so nothing else is worth polishing first.
- [ ] **Identity values.** Same file: `author.email`, the four `social` URLs (x, github, linkedin,
      unsplash) and `twitterHandle`. The social URLs are placeholders that currently ship as
      `sameAs` in the Person structured data, which is worse than omitting them.
- [ ] **`NEXT_PUBLIC_SITE_URL`** on the production deploy. It is `http://localhost:3000` locally, and
      every canonical, `og:url` and JSON-LD `@id` derives from it.
- [ ] **`public/resume.pdf`** does not exist, but `siteConfig.resumeUrl` points at it and the footer
      links to it. Add the file or drop the link.
