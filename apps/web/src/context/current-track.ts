import { create } from 'zustand'

import { SpotifyCurrentTrackResponse } from '@/@types/spotify-response'
import { socket } from '@/services/socket'

interface CurrentTrackStore {
  currentTrack: SpotifyCurrentTrackResponse | null
  connected: boolean
  startConnection: () => void
}

export const currentTrackStore = create<CurrentTrackStore>((set, get) => ({
  currentTrack: null,
  connected: false,
  startConnection: () => {
    socket.on('connect', () => {
      if (get().connected || socket.connected) return
      console.log('Connected to the server')
      socket.emit('join')
      set({ connected: true })
    })

    socket.on('current-track', (track: SpotifyCurrentTrackResponse) => {
      set({ currentTrack: track })
    })
  },
}))
