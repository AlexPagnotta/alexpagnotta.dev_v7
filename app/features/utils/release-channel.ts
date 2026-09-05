import { env } from "@/env";

export type ReleaseChannel = "local-dev" | "preview" | "staging" | "production";

// Non-production NODE_ENV means `next dev`, so local-dev overrides RELEASE_CHANNEL.
export const releaseChannel: ReleaseChannel =
  process.env.NODE_ENV !== "production" ? "local-dev" : env.NEXT_PUBLIC_RELEASE_CHANNEL;

export const isDevelopment = releaseChannel === "local-dev";
export const isPreview = releaseChannel === "preview";
export const isStaging = releaseChannel === "staging";
export const isProduction = releaseChannel === "production";
