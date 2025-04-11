import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { upload } from './routes/upload'
import path from 'node:path'

export const app = fastify()

const uploadsPath = path.join(process.cwd(), 'uploads')

app.register(fastifyMultipart, {
  prefix: 'files'
})

app.register(fastifyCors, {
  origin: '*',
  credentials: true
})

app.register(fastifyStatic, {
  root: uploadsPath,
  prefix: '/files/',
  decorateReply: true
})

app.register(upload)