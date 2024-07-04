import { count, db } from '@lippe/drizzle'
import { guestbooks } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '../middleware/auth'

export async function getMessage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/guestbook',
      {
        schema: {
          tags: ['guestbook'],
          summary: 'Get all messages',
          querystring: z.object({
            page: z.number().default(1),
            perPage: z.number().default(20),
          }),
        },
      },
      async (request, reply) => {
        const { page, perPage } = request.query
        const sesssion = await request.getCurrentUser()

        console.log(sesssion)

        const [messages, [{ amount }]] = await Promise.all([
          db
            .select()
            .from(guestbooks)
            .offset((page - 1) * perPage)
            .limit(perPage),
          db.select({ amount: count() }).from(guestbooks),
        ])

        return reply.status(200).send({
          messages,
          page,
          totalPages: Math.ceil(messages.length / amount),
        })
      },
    )
}
