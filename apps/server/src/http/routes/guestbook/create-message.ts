import { db, eq } from '@lippe/drizzle'
import { guestbooks } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createMessage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/guestbook',
    {
      schema: {
        tags: ['guestbook'],
        summary: 'Create a new message',
        body: z.object({
          userId: z.string().uuid(),
          message: z.string().min(10).max(1000),
        }),
      },
    },
    async (request, reply) => {
      const { userId, message } = request.body

      const user = await db.query.users.findFirst({
        where(fields) {
          return eq(fields.id, userId)
        },
      })

      if (!user) {
        return reply.status(404).send({ message: 'User not found' })
      }

      await db.insert(guestbooks).values({
        authorId: userId,
        message,
      })

      return reply.status(201).send()
    },
  )
}
