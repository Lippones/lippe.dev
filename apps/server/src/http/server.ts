import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { currentPlayingTrack } from './routes/spotify/current-playing-track'

const app = fastify({}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: ['https://lippe.dev', 'http://localhost:3000'],
})

app.register(fastifyIO, {
  cors: {
    origin: ['https://lippe.dev', 'http://localhost:3000'],
  },
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Lippe.dev API',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.withTypeProvider<ZodTypeProvider>().get('/health', async () => {
  return 'Health check'
})

app.register(currentPlayingTrack)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
