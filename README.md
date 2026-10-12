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
`ppframa-<weight>[-italic].woff2`, converted losslessly from the vendor OTFs. `app/(pages)/layout.tsx`
loads the Regular and Black cuts through `next/font/local`, preloaded, and their italics as a separate
family that loads only where italic text appears.

## Scripts

- `npm run dev` / `build` / `start` — Next.js
- `npm run check` — typecheck + Biome lint in parallel
- `npm run format` — Biome check with `--write --unsafe`
