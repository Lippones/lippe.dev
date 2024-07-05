'use server'
import { env } from '@lippe/env'
import { JWT } from 'next-auth/jwt'

interface Token extends JWT {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  error?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any
}

export const refreshAccessToken = async (token: Token): Promise<Token> => {
  try {
    const url = 'https://accounts.spotify.com/api/token'

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error('Error refreshing access token')

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
