import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Import the env file to validate the environment variables on build time.
import "./env";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.svg": [
        {
          // Skip SVGR for ?url imports — Can be imported as standard files from next image.
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
    },
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Turbopack requires remark/rehype plugins as string names with serializable options.
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
