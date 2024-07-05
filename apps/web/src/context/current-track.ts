import { env } from '@lippe/env'
import { io } from 'socket.io-client'
import { create } from 'zustand'

import { SpotifyCurrentTrackResponse } from '@/@types/spotify-response'

interface CurrentTrackStore {
  currentTrack: SpotifyCurrentTrackResponse | null
  connected: boolean
  startConnection: () => void
}

export const currentTrackStore = create<CurrentTrackStore>((set, get) => ({
  currentTrack: null,
  connected: false,
  startConnection: () => {
    if (get().connected) return

    const socket = io(env.NEXT_PUBLIC_API_URL)

    socket.on('connect', () => {
      console.log('Connected to the server')
      socket.emit('join')
      set({ connected: true })
    })

    socket.on('current-track', (track: SpotifyCurrentTrackResponse) => {
      set({ currentTrack: track })
    })
  },
}))
