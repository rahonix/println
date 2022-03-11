import { resolver } from "blitz"
import db from "db"
import { CreateBoardSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateBoardSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const board = await db.board.create({ data: { ...input, userId: ctx.session.userId } })

    return board
  }
)
