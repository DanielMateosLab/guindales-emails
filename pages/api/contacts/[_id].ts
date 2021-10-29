import { MethodNotAllowedError, UserNotFoundError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import { NextApiHandler, NextApiRequest } from "next"
import ContactsDAO from "server/ContactsDAO"
import { UnauthorizedError } from "server/errors"
import getUserIdFromRequest from "server/getContactIdFromRequest"
import setUpContactsDAO from "server/setUpContactsDAO"
import { Contact } from "utils/types"
import { addContactValidation } from "utils/validation"

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteHandler(req, res)
      break
    case "PUT":
      await putHandler(req, res)
      break
    default:
      throw new MethodNotAllowedError()
  }
}

const putHandler: NextApiHandler<Contact> = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  await validateIfUserIsContactOwner(req, contactsDAO)

  const updatedData = await addContactValidation.validate(req.body)

  const _id = getIdFromRequest(req)

  const result = await contactsDAO.updateContactById(_id, updatedData)

  if (result == undefined) throw new UserNotFoundError()

  res.status(200).json(result)
}

const deleteHandler: NextApiHandler = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  await validateIfUserIsContactOwner(req, contactsDAO)

  const _id = getIdFromRequest(req)

  const user_id = await getUserIdFromRequest(req)
  const contactUserId = await contactsDAO.getContactUserId(_id)
  if (user_id !== contactUserId) throw new UnauthorizedError()

  const success = await contactsDAO.deleteContactById(_id)

  if (success) {
    res.status(204).end()
  } else {
    throw new UserNotFoundError()
  }
}

function getIdFromRequest(req: NextApiRequest) {
  return typeof req.query._id == "string" ? req.query._id : ""
}

/** Checks if the contact belongs to the authenticated user and throws if it's not */
async function validateIfUserIsContactOwner(
  req: NextApiRequest,
  contactsDAO: ContactsDAO
) {
  const contact_id = getIdFromRequest(req)
  const authenticatedUserId = await getUserIdFromRequest(req)

  const contactUserId = await contactsDAO.getContactUserId(contact_id)
  if (authenticatedUserId !== contactUserId) throw new UnauthorizedError()
}

export default catchErrors(handler)
