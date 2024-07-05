import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './user'

export const guestbooks = pgTable('guestbook', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  message: text('message').notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', {
    mode: 'date',
  })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
  })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})
