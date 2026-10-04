<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Dev server

Port 3000 belongs to the user's own `npm run dev`. Never start, restart, or kill it.

- It is already running with HMR, so it serves your edits. Read from it (`curl`, a browser) as much as you need; reading disturbs nothing.
- Next 16 refuses a second dev server for the same directory, so `npm run dev -- -p 3001` just exits. There is no parallel instance to fall back on.
- If you ever do start one, shut down only that instance and match its port: `pkill -f "next dev -p 3001"`. Never `pkill -f "next dev"`.

# Styling

- Always use `className` with Tailwind utility classes for styling. No inline styles, CSS modules, or styled-components.
- For components with complex conditional variants, use `cva`. Name the `cva` styles object `{componentName}Styles` (e.g. `buttonStyles`, `selectStyles`).
- When a `className` no longer fits on one line, or carries long arbitrary values (`[--var:…]`, `calc()`), move it into a named `{elementName}Styles` constant built with `cx(...)`, one concern per argument (e.g. `wordmarkStyles` in `nav/footer.tsx`).
- Always use the design tokens defined in the Tailwind config — colors, typography, spacing, etc. Do not hardcode raw values.
- If a style requirement cannot be satisfied with existing tokens, **ask the user** before adding anything new. Once confirmed, add the new token to the appropriate Tailwind config file.
- Colors are `white`, `black`, `gray-100`, `gray-200`, `gray-300` plus the accents `green-dark/-light`, `yellow-dark/-light`, `pink-dark/-light`, `gray-dark/-light`, `purple-dark/-light`, named as in Figma. `-dark` fills large areas, `-light` is the small bright mark. Each accent also has a `--gradient-{accent}` for the display wordmark.
- Prefer CSS over JS: reach for container queries, `calc()` and custom properties before adding a measuring client component.

# Spacing units

The spacing scale is **rem-only**, driven by a single base token (`--spacing: 0.0625rem`) so that one unit equals one pixel at the 16px root font size. Every spacing/sizing utility resolves through it and scales with the user's font-size preference — e.g. `p-4` = 0.25rem = 4px, `size-14` = 0.875rem = 14px, `max-w-600` = 37.5rem = 600px.

- Use the bare numeric tokens for all padding, gaps, margins, `width`/`height`/`size`, and `max-width`: `px-24 py-12`, `gap-8`, `size-14`, `max-w-600`. Any positive integer works (e.g. `w-205`); it resolves to that many px in rem.
- **Never** hardcode px arbitrary values for spacing/sizing (no `size-[14px]`, `h-[180px]`) — use the scale token instead (`size-14`, `h-180`).

Border widths (`border`, `border-2`) and shadow offsets (`shadow-depth-*`, `drop-shadow-depth-*`, named by their px offset) are **not** part of the spacing scale — they remain their own fixed-px utilities and are unaffected by this.

# Typography

- **Always use the custom typography utilities** defined in `app/features/style/typography.css` for text styling, named as the Figma text styles:
  - `display-1`, `logo`
  - `heading-1` … `heading-4`
  - `body-1` … `body-4`
  - `label-1`, `label-2`
- `display-1`, `logo` and the headings pair the mobile and desktop cut from Figma, switching at `lg`. Body and label steps are the same on every breakpoint, so a responsive change there is two utilities (e.g. `body-1 lg:body-3`, the article paragraph). `display-1` is the only Black (900) style; everything else is Regular (400).
- Line heights are fixed px values from Figma, expressed through the spacing scale.
- `Tag` and `Button` set their own height per size (from Figma) rather than deriving it from the line box, so retuning a type step does not resize them, but it still moves anything that sizes to its text, such as `Marquee`.
- **Never use** raw tailwind text size classes (`text-display-1`, `text-heading-1`, `text-body-2`, etc.) directly — these are the underlying tokens used by the utilities above.
- Body copy defaults to `body-1` (16px), set on `body` in `global.css`. `label-1`/`label-2` (12/14px) are the tag and caption steps.
- Primitives in `app/features/ui/*` never hardcode font styles — the caller passes the typography utility in.

# SVG imports

SVGs resolve one of two ways, controlled by the import specifier (configured in `next.config.ts`):

- **As a React component (default)** — `import Logo from "./logo.svg"` gives an SVGR component used as `<Logo />`. Reserve this for **icons, brand marks, and cases that need to style/animate the SVG's internals** (e.g. `currentColor`, per-path props). Colocate them with the feature or content entry that uses them (e.g. `content/projects/<slug>/logo.svg`).
- **As a URL string** — `import src from "./image.svg?url"` (note the `?url` suffix) gives a plain served URL, **not** a component. This is the default for **content imagery** — anything you'd otherwise render through `<Image>`. The `ui/Image` primitive detects an SVG URL and renders a plain `<img>` (vector art gains nothing from `next/image` optimization), so passing an SVG URL to `<Image src={src} alt="…" />` just works.

Rule of thumb: if you'd `<Render />` it as markup, import as a component; if it's a picture, import with `?url`.

# Comments

- Default to writing no comments. Only add one when it explains something not obvious or understandable by looking at the code itself — a hidden constraint, a subtle invariant, a workaround for a specific bug.
- Never write a comment that just restates what the code does.
- Don't narrate a styling choice. The utility or token name already says what the value is, and noting that something differs from the rest of the system ("the one place that...") goes stale as soon as a second place appears.
- Before keeping a comment, delete it and re-read the line. If nothing is lost that a reader couldn't get from the code, leave it deleted.
- Keep comments to one line where possible, two at most. If it takes several sentences to explain, either the code needs a better name or the comment needs to be cut down to just the one fact that isn't obvious — don't stack multiple facts (styling rationale, cross-references, edge cases) into a single block.

# Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.) over generic `<div>`/`<span>` wrappers.
- Interactive elements must be keyboard-navigable and show a visible focus indicator — use `focus-visible` (not `focus`) so the outline appears only for keyboard users.
- Icon-only interactive elements must have an accessible label (`aria-label` or `aria-labelledby`). Decorative icons must have `aria-hidden="true"`.
- Never suppress focus outlines (no `outline-none` or `focus:outline-none` without a `focus-visible` replacement).
- Use `disabled` on native elements; if an element must remain in the tab order while visually disabled, use `aria-disabled` and block interaction manually.

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
