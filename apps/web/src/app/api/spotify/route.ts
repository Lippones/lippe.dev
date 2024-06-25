import { db, eq } from '@lippe/drizzle'
import { accounts } from '@lippe/drizzle/schema'
import { env } from '@lippe/env'
import axios from 'axios'

export async function GET() {
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
    axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  ])

  return Response.json(res.data)
}

const getAccessToken = async (refreshToken: string) => {
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
