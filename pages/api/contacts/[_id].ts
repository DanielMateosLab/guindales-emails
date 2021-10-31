import { MethodNotAllowedError, UserNotFoundError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import { NextApiHandler } from "next"
import setUpContactsDAO from "server/setUpContactsDAO"
import {
  getIdFromRequestQuery,
  validateIfSessionUserIsContactOwner,
} from "server/utils"
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

  await validateIfSessionUserIsContactOwner(req, contactsDAO)

  const updatedData = await addContactValidation.validate(req.body)

  const _id = getIdFromRequestQuery(req)

  const result = await contactsDAO.updateContactById(_id, updatedData)

  if (result == undefined) throw new UserNotFoundError()

  res.status(200).json(result)
}

const deleteHandler: NextApiHandler = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  await validateIfSessionUserIsContactOwner(req, contactsDAO)

  const contact_id = getIdFromRequestQuery(req)

  const success = await contactsDAO.deleteContactById(contact_id)

  if (success) {
    res.status(204).end()
  } else {
    throw new UserNotFoundError()
  }
}

export default catchErrors(handler)
