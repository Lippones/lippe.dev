import { SpotifyCurrentTrackResponse } from '@app/server/src/%40types/spotify-response'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getCurrentPlayingTrackInSpotify(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/spotify',
    {
      schema: {
        response: {
          200: SpotifyCurrentTrackResponse,
        },
      },
    },
    async () => {
      return {
        isPlaying: true,
        track: {
          name: 'Some track name',
          artists: ['Some artist'],
          album: 'Some album',
          imageUrl: 'https://via.placeholder.com/150',
        },
      }
    },
  )
}
