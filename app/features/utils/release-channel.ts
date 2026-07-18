import { env } from "@/env";

export type ReleaseChannel = "local-dev" | "preview" | "staging" | "production";

// NODE_ENV is "production" for any built app, so a non-production NODE_ENV means we are
// running locally (`next dev`) and treat it as local-dev regardless of RELEASE_CHANNEL.
// On a deployed build, RELEASE_CHANNEL selects the channel.
export const releaseChannel: ReleaseChannel =
  process.env.NODE_ENV !== "production" ? "local-dev" : env.NEXT_PUBLIC_RELEASE_CHANNEL;

export const isDevelopment = releaseChannel === "local-dev";
export const isPreview = releaseChannel === "preview";
export const isStaging = releaseChannel === "staging";
export const isProduction = releaseChannel === "production";
