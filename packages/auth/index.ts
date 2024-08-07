import './next-auth-extend.d'

import NextAuth from 'next-auth'

import { authConfig } from './auth-config'

export type { Session, User } from 'next-auth'

export * from 'next-auth'
export { useSession } from 'next-auth/react'
export { getToken } from 'next-auth/jwt'

export const {
  auth,
  signIn,
  signOut,
  unstable_update: update,
  handlers,
} = NextAuth(authConfig)
