import type { FastifyInstance } from 'fastify'

import { getCurrentPlayingTrackInSpotify } from '../../../utils/get-current-track-spotify'
import { startGlobalTimer } from '../../../utils/global-timer'

export async function currentPlayingTrack(app: FastifyInstance) {
  app.after(async () => {
    app.io.on('connection', (socket) => {
      const sendCurrentTrack = async () => {
        try {
          const track = await getCurrentPlayingTrackInSpotify()
          socket.emit('current-track', track)
        } catch (error) {
          console.error('Error fetching initial track:', error)
        }
      }

      sendCurrentTrack()

      startGlobalTimer(app.io)

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  })
}
