import type { FastifyInstance } from "fastify"

import { prisma } from "../../lib/prisma"

import fs from "node:fs"
import util from "node:util"
import { pipeline } from "node:stream"

import path from "node:path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function upload(app: FastifyInstance) {
  app.post("/upload/files", async (request, reply) => {
    try {
      const parts = request.files()
      const pump = util.promisify(pipeline)

      for await (const part of parts) {
        if (part.file) {
          const fileName = `${Date.now()}-${part.filename}`
          const uploadPath = path.resolve(
            __dirname,
            "../../../uploads",
            fileName
          )

          await pump(part.file, fs.createWriteStream(uploadPath))

          await prisma.photos.create({
            data: {
              name: part.filename,
              path: fileName,
            },
          })
        } else {
          return reply.status(400).send({
            message: "File not found",
          })
        }
      }

      return reply.status(201).send({
        message: "Files uploaded successfully",
      })
    } catch (error) {
      console.log(error)
    }
  })

  app.get("/photos", async () => {
    const photos = await prisma.photos.findMany()

    return photos
  })
}
