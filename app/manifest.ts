import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/features/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    // A portfolio reads as a site, not an app, so an installed copy keeps the browser chrome.
    display: "browser",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Padded cuts of the same mark, so a circular or squircle platform crop never clips the card.
      { src: "/web-app-manifest-maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
