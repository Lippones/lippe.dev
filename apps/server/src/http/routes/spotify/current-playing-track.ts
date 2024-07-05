import type { FastifyInstance } from 'fastify'

import { getCurrentPlayingTrackInSpotify } from '../../../utils/get-current-track-spotify'
import { startGlobalTimer, stopGlobalTimer } from '../../../utils/global-timer'

const connectedClients: Set<string> = new Set()

export async function currentPlayingTrack(app: FastifyInstance) {
  app.after(async () => {
    app.io.sockets.sockets.forEach((socket) => {
      socket.disconnect(true)
    })
    app.io.on('connection', (socket) => {
      // socket.on('join', () => {
      if (connectedClients.has(socket.id)) {
        console.log(`Client ${socket.id} is already in the room.`)
        return
      }

      connectedClients.add(socket.id)

      console.info(`Client ${socket.id} joined the room.`)

      const sendCurrentTrack = async () => {
        try {
          const track = await getCurrentPlayingTrackInSpotify()
          socket.emit('current-track', track)
        } catch (error) {
          console.error('Error fetching initial track:')
        }
      }

      sendCurrentTrack()
      startGlobalTimer(app.io)
      // })

      socket.on('disconnect', () => {
        connectedClients.delete(socket.id)

        if (connectedClients.size === 0) {
          console.info('No clients connected. Stopping global timer.')
          stopGlobalTimer()
        }
      })
    })
  })
}
