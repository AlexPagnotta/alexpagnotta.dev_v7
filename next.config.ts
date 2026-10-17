import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Import the env file to validate the environment variables on build time.
import "./env";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: smaller than WebP, and encoded once per size before the optimizer caches it.
    formats: ["image/avif", "image/webp"],
    // The defaults plus 1440, so a 2x phone filling the 672px text column doesn't jump from 1200 to 1920.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Lets a phone on the LAN load the dev server's scripts; without it only the static HTML arrives, never hydrated.
  allowedDevOrigins: ["192.168.*.*"],
  turbopack: {
    rules: {
      "*.svg": [
        {
          // Skip SVGR for ?url imports, which next/image loads as plain files.
          condition: { not: { query: /url/ } },
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                svgo: true,
                typescript: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "*.js",
        },
      ],
      // Colocated video files are emitted as static assets so a plain `import` returns
      // their served URL (next/image handles images natively; this covers video).
      "*.{mp4,mov,webm}": {
        type: "asset",
      },
    },
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Turbopack takes plugins as string names; `unwrap-images` keeps MarkdownImage's figure out of a <p>.
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"], ["remark-unwrap-images"]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
