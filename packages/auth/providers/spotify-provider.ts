import { env } from '@lippe/env'
import Spotify from 'next-auth/providers/spotify'

export const SpotifyProvider = Spotify({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_SECRET,
  allowDangerousEmailAccountLinking: true,
  authorization:
    'https://accounts.spotify.com/authorize?scope=user-read-currently-playing,user-read-playback-state,user-read-email',
})
