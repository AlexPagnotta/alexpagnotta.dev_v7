import { env } from "@/env";

type ReleaseChannel = "local-dev" | "preview" | "staging" | "production";

// Non-production NODE_ENV means `next dev`, so local-dev overrides RELEASE_CHANNEL.
const releaseChannel: ReleaseChannel =
  process.env.NODE_ENV !== "production" ? "local-dev" : env.NEXT_PUBLIC_RELEASE_CHANNEL;

export const isProduction = releaseChannel === "production";
