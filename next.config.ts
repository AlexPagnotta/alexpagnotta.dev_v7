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
    },
  },
};

export default nextConfig;
