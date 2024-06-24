import Spotify from "next-auth/providers/spotify"
import { env } from '@lippe/env'

export const SpotifyProvider = Spotify({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_SECRET,
  authorization: 'https://accounts.spotify.com/authorize?scope=user-read-currently-playing,user-read-playback-state',
})