import { env } from '@lippe/env'
import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'

import * as schema from './schema'

export * from 'drizzle-orm'

const client = new Pool({
  connectionString: env.DATABASE_URL,
})
export const db = drizzle(client, { schema })
