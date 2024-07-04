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
          userId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { messageId, userId } = request.params

      const user = await db.query.users.findFirst({
        where(fields) {
          return eq(fields.id, userId)
        },
      })

      if (!user) {
        return reply.status(404).send({ message: 'User not found' })
      }

      return reply.status(200).send()
    },
  )
}
