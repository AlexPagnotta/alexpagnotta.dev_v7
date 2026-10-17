import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().min(1),
    // Deployed builds only (local dev comes from NODE_ENV); defaults to production so a forgotten var never leaks drafts.
    NEXT_PUBLIC_RELEASE_CHANNEL: z.enum(["preview", "staging", "production"]).default("production"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_RELEASE_CHANNEL: process.env.NEXT_PUBLIC_RELEASE_CHANNEL,
  },
});
