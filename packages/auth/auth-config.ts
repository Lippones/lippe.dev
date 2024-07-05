import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@lippe/drizzle'
import { NextAuthConfig, Session } from 'next-auth'

import { GithubProvider } from './providers/github-provider'
import { SpotifyProvider } from './providers/spotify-provider'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [SpotifyProvider, GithubProvider],
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (user) {
        // token.role = user.role
        token.id = user.id
      }

      function isSessionAvailable(session: unknown): session is Session {
        return !!session
      }

      if (trigger === 'update' && isSessionAvailable(session)) {
        // TODO: Create function to update user

        if (session.user?.image) {
          token.picture = session.user.image
        }
        if (session.user?.name) {
          token.name = session.user.name
        }
      }

      return token
    },
    session({ session, ...params }) {
      if ('token' in params && session.user) {
        // session.user.role = params.token.role as Role
        session.user.id = params.token.sub!
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
