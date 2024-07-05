import { count, db, desc, eq } from '@lippe/drizzle'
import { guestbooks, users } from '@lippe/drizzle/schema'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getMessage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/guestbook',
    {
      schema: {
        tags: ['guestbook'],
        summary: 'Get all messages',
        querystring: z.object({
          page: z.coerce.number().default(1),
          perPage: z.coerce.number().default(20),
        }),
      },
    },
    async (request, reply) => {
      const { page, perPage } = request.query

      const [messages, [{ amount }]] = await Promise.all([
        db
          .select()
          .from(guestbooks)
          .leftJoin(users, eq(guestbooks.authorId, users.id))
          .offset((page - 1) * perPage)
          .limit(perPage)
          .orderBy(desc(guestbooks.createdAt)),
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
