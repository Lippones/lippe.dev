import type { FastifyInstance } from 'fastify'

import { createMessage } from './guestbook/create-message'
import { deleteMessage } from './guestbook/delete-message'
import { getMessage } from './guestbook/get-messages'
import { clientsRealTime } from './real-time/clients-real-time'
import { currentPlayingTrack } from './real-time/spotify/current-playing-track'

export async function appRoutes(app: FastifyInstance) {
  // Spotify
  app.register(currentPlayingTrack)

  // Guestbook
  app.register(createMessage)
  app.register(deleteMessage)
  app.register(getMessage)

  // Real time
  app.register(clientsRealTime)
}
