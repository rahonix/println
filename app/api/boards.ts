import { BlitzApiRequest, BlitzApiResponse } from "blitz"

import db from "db"
import { CreateEntrySchema } from "app/entries/validations"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 400
  if (req.method !== "PUT") {
    return res.end()
  }
  try {
    const data = CreateEntrySchema.parse(JSON.parse(req.body))
    await db.entry.create({ data: data })
    res.statusCode = 200
    return res.end()
  } catch (err) {
    return res.end()
  }
}

export default handler
