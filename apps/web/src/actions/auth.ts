'use server'

import { signIn } from "@lippe/auth"

type Providers = 'spotify' | 'github'

export async function signInProvider(provider: Providers) {
  return signIn(provider)
}