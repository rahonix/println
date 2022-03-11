import { z } from "zod"

const name = z.string().min(3).max(20)
const user = z.string()
const id = z.string()

export const CreateBoardSchema = z.object({
  name,
})

export const UpdateBoardSchema = z.object({
  id,
  name,
})

export const DeleteBoardSchema = z.object({
  id,
})
