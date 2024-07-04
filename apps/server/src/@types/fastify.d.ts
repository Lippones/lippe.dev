import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<Session>
  }
}
