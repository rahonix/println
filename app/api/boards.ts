import {
  BlitzApiRequest,
  BlitzApiResponse,
  getAntiCSRFToken,
  getSession,
  invokeWithMiddleware,
  useMutation,
} from "blitz"
import createEntry from "app/entries/mutations/createEntry"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 400
  if (req.method !== "PUT") {
    return res.end()
  }
  try {
    const antiCSRFToken = getAntiCSRFToken()
    console.log(antiCSRFToken)
    if (!antiCSRFToken) {
      return res.end()
    }
    req.headers["anti-csrf"] = antiCSRFToken
    await invokeWithMiddleware(createEntry, JSON.parse(req.body), { req, res })
    req.statusCode = 200
    res.end(JSON.stringify({ name: "John Doe" }))
  } catch (err) {
    console.log(err)
    return res.end()
  }
}

export default handler
