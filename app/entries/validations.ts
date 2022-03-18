import { z } from "zod"

const text = z.string()
const type = z.optional(z.enum(["TEXT", "WARNING", "INFO", "ERROR"]))
const boardId = z.string()

export const CreateEntrySchema = z.object({
  text,
  type,
  boardId,
})
