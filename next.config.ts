import type { NextConfig } from "next";

// Import the env file to validate the environment variables on build time.
import "./env";

const nextConfig: NextConfig = {
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
      // Colocated video files are emitted as static assets so a plain `import` returns
      // their served URL (next/image handles images natively; this covers video).
      "*.{mp4,mov,webm}": {
        type: "asset",
      },
    },
  },
};

export default nextConfig;
