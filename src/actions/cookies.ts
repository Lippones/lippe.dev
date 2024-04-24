'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function setCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>,
) {
  cookies().set(key, value, options)
}
