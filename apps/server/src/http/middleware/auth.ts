import type { Session } from '@lippe/auth'
import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '@/errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const session = await request.jwtVerify<Session>()

        console.log(session)

        return session
      } catch (error) {
        throw new UnauthorizedError('Unauthorized')
      }
    }
  })
})
