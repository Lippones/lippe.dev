import { env } from '@lippe/env'
import axios from 'axios'

export const getAccessToken = async (refreshToken: string) => {
  const basic = Buffer.from(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_SECRET}`,
  ).toString('base64')

  const { data } = await axios.post<{
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
  }>(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        refresh_token: refreshToken,
      },
    },
  )

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  }
}
