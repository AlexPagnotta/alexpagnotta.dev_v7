<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Styling

- Always use `className` with Tailwind utility classes for styling. No inline styles, CSS modules, or styled-components.
- For components with complex conditional variants, use `cva` (class-variance-authority). Name the `cva` styles object `{componentName}Styles` (e.g. `buttonStyles`, `selectStyles`).
- Always use the design tokens defined in the Tailwind config — colors, typography, spacing, etc. Do not hardcode raw values.
- If a style requirement cannot be satisfied with existing tokens, **ask the user** before adding anything new. Once confirmed, add the new token to the appropriate Tailwind config file.

# Spacing units

The spacing scale is **rem-only**, driven by a single base token (`--spacing: 0.0625rem`) so that one unit equals one pixel at the 16px root font size. Every spacing/sizing utility resolves through it and scales with the user's font-size preference — e.g. `p-4` = 0.25rem = 4px, `size-14` = 0.875rem = 14px, `max-w-600` = 37.5rem = 600px.

- Use the bare numeric tokens for all padding, gaps, margins, `width`/`height`/`size`, and `max-width`: `px-24 py-12`, `gap-8`, `size-14`, `max-w-600`. Any positive integer works (e.g. `w-205`); it resolves to that many px in rem.
- **Never** hardcode px arbitrary values for spacing/sizing (no `size-[14px]`, `h-[180px]`) — use the scale token instead (`size-14`, `h-180`).

Border widths (`border`, `border-2`) and shadow offsets (`shadow-depth-*`) are **not** part of the spacing scale — they remain their own fixed-px utilities and are unaffected by this.

# Typography

- **Always use the custom typography utilities** defined in `app/features/style/typography.css` for text styling:
  - `display`
  - `title-1`, `title-2`, `title-3`
  - `body-3`, `body-2`, `body-1`
  - `caption`
- **Never use** raw tailwind text size classes (`text-display`, `text-title-1`, `text-body-1`, etc.) directly — these are the underlying tokens used by the utilities above.

# Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.) over generic `<div>`/`<span>` wrappers.
- Interactive elements must be keyboard-navigable and show a visible focus indicator — use `focus-visible` (not `focus`) so the outline appears only for keyboard users.
- Icon-only interactive elements must have an accessible label (`aria-label` or `aria-labelledby`). Decorative icons must have `aria-hidden="true"`.
- Never suppress focus outlines (no `outline-none` or `focus:outline-none` without a `focus-visible` replacement).
- Use `disabled` on native elements; if an element must remain in the tab order while visually disabled, use `aria-disabled` and block interaction manually.

# Commits

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

# TypeScript

- Always use `type` over `interface`.
- Component props types: use `type Props` if not exported; use `type {ComponentName}Props` if exported.
- Always declare components as `const` arrow functions, not `function` declarations (e.g. `const Button = () => ...`, not `function Button() ...`).
