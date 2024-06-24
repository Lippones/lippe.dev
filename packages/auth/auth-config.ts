import { NextAuthConfig } from 'next-auth'
import { SpotifyProvider } from './providers/spotify-provider'

export const authConfig = {
  providers: [SpotifyProvider],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
