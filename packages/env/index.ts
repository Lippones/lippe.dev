import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    CONTACT_EMAIL: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: process.env,
})
