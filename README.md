# Alex Pagnotta Dev V7

My personal site and portfolio.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fonts

[PP Frama](https://pangrampangram.com/products/frama) lives in `public/fonts` as
`ppframa-<weight>[-italic].otf`. `app/(pages)/layout.tsx` loads the Regular and Black cuts, each with
its italic, through `next/font/local`; the ExtraLight files are not loaded.

## Scripts

- `npm run dev` / `build` / `start` — Next.js
- `npm run check` — typecheck + Biome lint in parallel
- `npm run format` — Biome check with `--write --unsafe`
