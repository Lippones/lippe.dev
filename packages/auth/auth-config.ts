import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@lippe/drizzle'
import { NextAuthConfig } from 'next-auth'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
