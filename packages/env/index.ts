import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    CONTACT_EMAIL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    SPOTIFY_EMAIL: z.string().email(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_PARTY_KIT_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY, 
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    SPOTIFY_EMAIL: process.env.SPOTIFY_EMAIL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    NEXT_PUBLIC_PARTY_KIT_URL: process.env.NEXT_PUBLIC_PARTY_KIT_URL,
  },
})
