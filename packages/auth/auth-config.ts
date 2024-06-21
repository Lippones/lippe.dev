import { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
