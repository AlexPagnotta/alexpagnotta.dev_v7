import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TEST_SERVER_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLIENT_ENV: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().min(1),
    // Release channel for DEPLOYED builds only (local dev is derived from NODE_ENV).
    // Public so client code can branch on it; defaults to the safest channel so a
    // forgotten var never leaks drafts to production.
    NEXT_PUBLIC_RELEASE_CHANNEL: z.enum(["preview", "staging", "production"]).default("production"),
  },
  runtimeEnv: {
    TEST_SERVER_ENV: process.env.TEST_SERVER_ENV,
    NEXT_PUBLIC_CLIENT_ENV: process.env.NEXT_PUBLIC_CLIENT_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_RELEASE_CHANNEL: process.env.NEXT_PUBLIC_RELEASE_CHANNEL,
  },
});
