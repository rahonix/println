import { resolver } from "blitz"
import db from "db"
import { CreateEntrySchema } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateEntrySchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const entry = await db.entry.create({ data: input })

    return entry
  }
)
