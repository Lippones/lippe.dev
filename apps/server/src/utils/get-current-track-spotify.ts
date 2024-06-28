import { db, eq } from '@lippe/drizzle'
import { accounts } from '@lippe/drizzle/schema'
import { env } from '@lippe/env'
import axios from 'axios'

import type { SpotifyCurrentTrackResponse } from '@/@types/spotify-response'

import { getAccessToken } from './get-access-token'

export async function getCurrentPlayingTrackInSpotify() {
  const user = await db.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.email, env.SPOTIFY_EMAIL)
    },
    with: {
      accounts: true,
    },
  })

  if (!user) {
    return Response.json(
      {
        message: 'User not found',
      },
      {
        status: 404,
      },
    )
  }

  const spotifyAccount = user.accounts.find(
    (account) => account.provider === 'spotify',
  )

  if (!spotifyAccount) {
    return Response.json(
      {
        message: 'Spotify account not found',
      },
      {
        status: 404,
      },
    )
  }

  const { accessToken, refreshToken, expiresIn } = await getAccessToken(
    spotifyAccount.refresh_token || '',
  )

  const [, res] = await Promise.all([
    db
      .update(accounts)
      .set({
        refresh_token: refreshToken,
        access_token: accessToken,
        expires_at: expiresIn,
      })
      .where(eq(accounts.userId, user.id))
      .returning({
        data: accounts,
      }),
    axios.get<SpotifyCurrentTrackResponse | string>(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
  ])

  if (res.data === '') return null

  return res.data
}
