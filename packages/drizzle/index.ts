import { env } from '@lippe/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

const client = neon(env.DATABASE_URL)
export const db = drizzle(client, { schema })
