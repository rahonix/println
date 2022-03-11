import { resolver } from "blitz"
import db from "db"
import { UpdateBoardSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateBoardSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const board = await db.board.update({ where: { id }, data })

    return board
  }
)
