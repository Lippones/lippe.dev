import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@lippe/drizzle'
import { NextAuthConfig } from 'next-auth'

import { SpotifyProvider } from './providers/spotify-provider'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [SpotifyProvider],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
