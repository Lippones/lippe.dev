import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@lippe/env'
import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { UnauthorizedError } from './errors/unauthorized-error'
import { appRoutes } from './http/routes/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.AUTH_SECRET,
  verify: {
    algorithms: ['HS256'],
  },
})

app.register(fastifyIO, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.flatten().fieldErrors,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    // console.log(error)
  } else {
    // TODO: Usar alguma ferramenta de log
  }

  return reply.status(500).send({ message: 'Internal server error.' })
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

app.register(appRoutes)
