import { z } from "zod"

const text = z.string()
const type = z.optional(z.enum(["SUCCESS", "WARNING", "INFO", "ERROR"]))
const boardId = z.string()

export const CreateEntrySchema = z.object({
  text,
  type,
  boardId,
})
