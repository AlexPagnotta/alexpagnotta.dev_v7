<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Styling

- Always use `className` with Tailwind utility classes for styling. No inline styles, CSS modules, or styled-components.
- For components with complex conditional variants, use `cva` (class-variance-authority). Name the `cva` styles object `{componentName}Styles` (e.g. `buttonStyles`, `selectStyles`).
- Always use the design tokens defined in the Tailwind config — colors, typography, spacing, etc. Do not hardcode raw values.
- If a style requirement cannot be satisfied with existing tokens, **ask the user** before adding anything new. Once confirmed, add the new token to the appropriate Tailwind config file.

# Spacing units (rem vs px)

The spacing scale exposes every step in two units: the bare token in **rem** (e.g. `p-4`, `gap-8`, `size-14`) and a fixed **px** twin with a `-px` suffix (e.g. `p-4-px`, `gap-8-px`, `size-14-px`). Pick the unit based on one question — _should this value grow when the user increases their browser font size?_ (an accessibility setting). This is about the **font-size preference**, not page zoom, which scales everything regardless of unit.

- **Use `rem` (scales with font size)** — the default for anything that spaces or sizes _content_, so layouts stay proportional when text is enlarged:
  - padding and gaps inside/around text and interactive controls (buttons, inputs, menu items) — keeps hit areas proportional to the label
  - margins / vertical rhythm between text blocks
  - reading-measure `max-width` (line length scales with text)
  - font size (always rem — see Typography)
- **Use `px` (stays fixed)** — for visual/structural details that must render identically regardless of text size:
  - border / stroke widths and hairline dividers (`border`, `border-2`)
  - focus outline width & offset
  - box-shadow offsets & blur
  - icon / glyph sizes and other fixed graphic details

Examples:

- Button / control padding → **rem**: `px-24 py-12` (the control grows with its label).
- Control border → **px**: `border-2` (a 2px stroke shouldn't thicken when text scales).
- Icon inside a control → **px**: `size-14-px` (a crisp, fixed glyph).
- Depth shadow → **px**: `4px 4px 0 0` (fixed offset).
- Reading column → **rem**: `max-w-600` (line length scales with the text).

When in doubt: content spacing = `rem`; borders, shadows, outlines, and icons = `px`.

# Typography

- **Always use the custom typography utilities** defined in `app/features/style/typography.css` for text styling:
  - `display`
  - `title-1`, `title-2`, `title-3`
  - `body-2`, `body-1`
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
