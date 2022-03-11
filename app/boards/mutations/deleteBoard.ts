import { resolver } from "blitz"
import db from "db"
import { DeleteBoardSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteBoardSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const board = await db.board.deleteMany({ where: { id } })

    return board
  }
)
