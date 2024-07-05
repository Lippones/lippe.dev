import { db, eq } from '@lippe/drizzle'
import { guestbooks } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createMessage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
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

      const user = await db.query.users.findFirst({
        where(fields) {
          return eq(fields.id, id)
        },
      })

      const isOwner = user?.id === id

      if (!isOwner) {
        return reply.status(404).send({ message: 'User not found' })
      }

      await db.delete(guestbooks).where(eq(guestbooks.id, messageId))

      return reply.status(200).send()
    },
  )
}
