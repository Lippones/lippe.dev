'use server'

import { auth, signIn } from '@lippe/auth'
import { env } from '@lippe/env'
import { sign } from 'jsonwebtoken'

type Providers = 'spotify' | 'github'

export async function signInProvider(provider: Providers) {
  return signIn(provider)
}

// TODO: refactor this function in the future
export async function generateJWTSession() {
  const session = await auth()

  if (session === null) {
    return null
  }

  const token = sign(session, env.AUTH_SECRET)

  return token
}
