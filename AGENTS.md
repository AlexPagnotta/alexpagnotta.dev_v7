<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project

- Personal site on Next.js 16. Code is grouped by domain in `app/features/<domain>` (layout, ui, home-page, detail-page, content, ...).
- Content is MDX in `content/{projects,writings,thoughts}/<slug>/index.mdx`. Start a new entry by copying that folder's `_template`.
- After changes, run `npm run check` (tsc + Biome). Lefthook also runs Biome and tsc on staged files at commit.

# Dev server

Port 3000 belongs to the user's own `npm run dev`. Never start, restart, or kill it.

- It is already running with HMR, so it serves your edits. Read from it (`curl`, a browser) as much as you need; reading disturbs nothing.
- Next 16 refuses a second dev server for the same directory, so `npm run dev -- -p 3001` just exits. There is no parallel instance to fall back on.
- If you ever do start one, shut down only that instance and match its port: `pkill -f "next dev -p 3001"`. Never `pkill -f "next dev"`.

# Styling

- Always use `className` with Tailwind utility classes for styling. No inline styles, CSS modules, or styled-components.
- For components with complex conditional variants, use `cva`. Import `cva`/`cx` from `@/app/features/style/cva`. Name the `cva` styles object `{componentName}Styles` (e.g. `buttonStyles`, `selectStyles`).
- When a `className` no longer fits on one line, or carries long arbitrary values (`[--var:…]`, `calc()`), move it into a named `{elementName}Styles` constant built with `cx(...)`, one concern per argument (e.g. `wordmarkStyles` in `layout/footer.tsx`).
- Always use the design tokens defined in the Tailwind config — colors, typography, spacing, etc. Do not hardcode raw values.
- If a style requirement cannot be satisfied with existing tokens, **ask the user** before adding anything new. Once confirmed, add the new token to the appropriate Tailwind config file.
- Colors are `white`, `black`, `gray-100`, `gray-200`, `gray-300` plus the accents `green-dark/-light`, `yellow-dark/-light`, `pink-dark/-light`, `gray-dark/-light`, `purple-dark/-light`, named as in Figma. `-dark` fills large areas, `-light` is the small bright mark. Each accent also has a `--gradient-{accent}` for the display wordmark.
- Prefer CSS over JS: reach for container queries, `calc()` and custom properties before adding a measuring client component.

# Spacing units

- Spacing and sizing use the bare numeric scale, where each unit is 1px in rem: `px-24 py-12`, `gap-8`, `size-14`, `max-w-600`. Any positive integer works (e.g. `w-205`).
- **Never** hardcode px arbitrary values for spacing/sizing (no `size-[14px]`, `h-[180px]`); use the scale token instead (`size-14`, `h-180`).
- Border widths (`border`, `border-2`) and shadow offsets (`shadow-depth-*`, `drop-shadow-depth-*`) are not on the scale; they stay fixed px.

# Typography

- **Always use the custom typography utilities** defined in `app/features/style/typography.css`, named as the Figma text styles:
  - `display-1`, `logo`, `logo-sm`
  - `heading-1` … `heading-4`
  - `body-1` … `body-4`
  - `label-1`, `label-2`
  - `code-1` (Geist Mono, code blocks)
- **Never use** raw tailwind text size classes (`text-display-1`, `text-heading-1`, `text-body-2`, etc.) directly — these are the underlying tokens used by the utilities above.
- Display, logo and headings already switch between mobile and desktop at `lg`. Body and label steps don't, so a responsive change there is two utilities (e.g. `body-1 lg:body-3`).
- Body copy defaults to `body-1` (16px), set on `body` in `global.css`. `label-1`/`label-2` (12/14px) are the tag and caption steps.
- Primitives in `app/features/ui/*` take their typography from the caller, except where a size ties the type step to a fixed Figma height or a text-measured timing (`Button`, `Tag`, `Tab`, `Marquee`); those bind it in the variant.

# SVG imports

SVGs resolve one of two ways, controlled by the import specifier (configured in `next.config.ts`):

- **As a React component (default)** — `import Logo from "./logo.svg"` gives an SVGR component used as `<Logo />`. Reserve this for **icons, brand marks, and cases that need to style/animate the SVG's internals** (e.g. `currentColor`, per-path props). Colocate them with the feature or content entry that uses them (e.g. `content/projects/<slug>/logo.svg`).
- **As a URL string** — `import src from "./image.svg?url"` (note the `?url` suffix) gives a plain served URL, **not** a component. This is the default for **content imagery** — anything you'd otherwise render through `<Image>`. The `ui/Image` primitive detects an SVG URL and renders a plain `<img>` (vector art gains nothing from `next/image` optimization), so passing an SVG URL to `<Image src={src} alt="…" />` just works.

Rule of thumb: if you'd `<Render />` it as markup, import as a component; if it's a picture, import with `?url`.

# Comments

**Default to no comments.** Agents over-comment in this codebase; this rule is strict.

- Only comment a hidden constraint, a subtle invariant, or a workaround for a specific bug. Never restate the code or narrate a styling choice (the token name already says it).
- One line, two at most. Before keeping a comment, delete it and re-read the code: if nothing is lost, leave it deleted.

# Accessibility

- Use `focus-visible` (not `focus`) for focus indicators.
- Never suppress focus outlines (no `outline-none` without a `focus-visible` replacement).

# Commits

- Always ask for confirmation before committing. Do not run `git commit` unless the user has explicitly asked or approved in the current exchange.
- Use Conventional Commits: `type: short one-line description`, e.g. `feat: add hero section animation`.
- Common types: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`.
- Description is lowercase, imperative mood (e.g. "add" not "added"/"adds"), no trailing period.
- Keep the summary line short (under ~72 chars); only add a body if the "why" isn't obvious from the diff.
- No scopes (e.g. no `feat(auth):`) unless the user asks for them.

# File Naming

- Component files must use kebab-case (e.g. `text-area.tsx`, `icon.tsx`).
- Only place a component in a subfolder if it has more than one file. A single-file component lives directly in the parent directory (e.g. `ui/button.tsx`, not `ui/button/button.tsx`).

# Module Exports

- Do not create `index.ts` (or `index.tsx`) barrel files for re-exporting modules.
- Always export components and constants inline (e.g. `export const Button = () => ...`). Do not use a separate `export { ... }` statement at the bottom of the file.

# React Imports

- Always import React as a namespace: `import * as React from "react"`. Do not use named or default imports from `react` (e.g. no `import { useRef } from "react"`); access hooks and types via the namespace (`React.useRef`, `React.ReactNode`).

# TypeScript

- Always use `type` over `interface`.
- Component props types: use `type Props` if not exported; use `type {ComponentName}Props` if exported.
- Always declare components as `const` arrow functions, not `function` declarations (e.g. `const Button = () => ...`, not `function Button() ...`).
