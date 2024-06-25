import { env } from '@lippe/env'
import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

// neonConfig.fetchConnectionCache = true

if (!env.DATABASE_URL) {
  throw new Error('Invalid environment variable DIRECT_DATABASE_URL')
}

const connection = neon(env.DATABASE_URL)
const db = drizzle(connection)

migrate(db, { migrationsFolder: __dirname.concat('/migrations') }).then(() => {
  console.log('Migrations applied successfully!')
})
