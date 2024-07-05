import { db, eq } from '@lippe/drizzle'
import { guestbooks } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'

export async function deleteMessage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/guestbook/:messageId',
      {
        schema: {
          tags: ['guestbook'],
          summary: 'Delete message',
          params: z.object({
            messageId: z.string().uuid(),
          }),
        },
      },
      async (request, reply) => {
        const { messageId } = request.params

        const {
          user: { id },
        } = await request.getCurrentUser()

        if (!id) {
          return reply.status(401).send({ message: 'Unauthorized' })
        }

        const [user, message] = await Promise.all([
          db.query.users.findFirst({
            where(fields) {
              return eq(fields.id, id)
            },
          }),
          db.query.guestbooks.findFirst({
            where(fields) {
              return eq(fields.id, messageId)
            },
          }),
        ])

        const isOwner =
          message?.authorId === id || user?.email === 'filipe68ft@hotmail.com'

        if (!isOwner) {
          return reply.status(401).send({ message: 'Unauthorized' })
        }

        await db.delete(guestbooks).where(eq(guestbooks.id, messageId))

        return reply.status(200).send()
      },
    )
}
