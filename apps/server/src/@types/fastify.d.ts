import 'fastify'

import type { Session } from '@lippe/auth'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<Session>
  }
}
