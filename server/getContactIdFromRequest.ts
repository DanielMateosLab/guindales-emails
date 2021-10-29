import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import { UnauthorizedError } from "./errors"

/** Returns the _id of the authenticated user.
 *  If there is no authenticated user, throws an Unauthorized error.
 */
export default async function getUserIdFromRequest(
  req: NextApiRequest
): Promise<string> {
  const session = await getSession({ req })

  if (session == null) {
    throw new UnauthorizedError()
  }

  return session.user._id
}
