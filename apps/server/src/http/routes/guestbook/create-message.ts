import { db, eq } from '@lippe/drizzle'
import { guestbooks } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '../../middleware/auth'

export async function createMessage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/guestbook',
      {
        schema: {
          tags: ['guestbook'],
          summary: 'Create a new message',
          body: z.object({
            message: z.string().min(10).max(1000),
          }),
        },
      },
      async (request, reply) => {
        const { message } = request.body

        const {
          user: { id },
        } = await request.getCurrentUser()

        console.log(id)

        if (!id) {
          return reply.status(401).send({ message: 'Unauthorized' })
        }

        const user = await db.query.users.findFirst({
          where(fields) {
            return eq(fields.id, id)
          },
        })

        if (!user) {
          return reply.status(404).send({ message: 'User not found' })
        }

        await db.insert(guestbooks).values({
          authorId: id,
          message,
        })

        return reply.status(201).send()
      },
    )
}
