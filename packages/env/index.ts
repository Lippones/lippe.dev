import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    CONTACT_EMAIL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    SPOTIFY_EMAIL: z.string().email(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
  },
  runtimeEnv: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY, 
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    SPOTIFY_EMAIL: process.env.SPOTIFY_EMAIL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
})
