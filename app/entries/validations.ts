import { z } from "zod"

const text = z.string()
const boardId = z.string()

export const CreateEntrySchema = z.object({
  text,
  boardId,
})
