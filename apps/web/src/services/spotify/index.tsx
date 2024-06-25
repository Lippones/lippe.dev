import { api } from '../api'
import { SpotifyCurrentTrackResponse } from './types'

export async function getCurrentPlayingTrackInSpotify() {
  const { data } = await api.get<SpotifyCurrentTrackResponse>('/spotify')

  return data
}
