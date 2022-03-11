import { z } from "zod"

const text = z.string()
const board = z.string()

export const CreateEntrySchema = z.object({
  text,
  board,
})
