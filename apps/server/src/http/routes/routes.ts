import type { FastifyInstance } from 'fastify'

import { createMessage } from './guestbook/create-message'
import { deleteMessage } from './guestbook/delete-message'
import { getMessage } from './guestbook/get-messages'
import { currentPlayingTrack } from './spotify/current-playing-track'

export async function appRoutes(app: FastifyInstance) {
  app.register(currentPlayingTrack)
  app.register(createMessage)
  app.register(deleteMessage)
  app.register(getMessage)
}
