import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TEST_SERVER_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLIENT_ENV: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().min(1),
  },
  runtimeEnv: {
    TEST_SERVER_ENV: process.env.TEST_SERVER_ENV,
    NEXT_PUBLIC_CLIENT_ENV: process.env.NEXT_PUBLIC_CLIENT_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
