import { ObjectId } from "bson"
import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import ContactsDAO from "./ContactsDAO"
import { InvalidIdError, UnauthorizedError } from "./errors"

/** Returns the _id of the authenticated user.
 *  If there is no authenticated user, throws an Unauthorized error.
 */
export async function getUserIdFromRequestSession(
  req: NextApiRequest
): Promise<ObjectId> {
  const session = await getSession({ req })

  if (session == null) {
    throw new UnauthorizedError()
  }

  return new ObjectId(session.user._id)
}

export function getIdFromRequestQuery(req: NextApiRequest) {
  if (typeof req.query._id == "string") {
    return new ObjectId(req.query._id)
  }

  throw new InvalidIdError()
}

/** Checks if the contact belongs to the authenticated user and throws if it's not. */
export async function validateIfSessionUserIsContactOwner(
  req: NextApiRequest,
  contactsDAO: ContactsDAO
) {
  const contact_id = getIdFromRequestQuery(req)
  const authenticatedUserId = await getUserIdFromRequestSession(req)

  const contactUserId = await contactsDAO.getContactUserId(contact_id)
  if (contactUserId == undefined || !contactUserId.equals(authenticatedUserId))
    throw new UnauthorizedError()
}
