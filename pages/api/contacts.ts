import { MethodNotAllowedError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiHandler } from "next"
import setUpContactsDAO from "server/setUpContactsDAO"
import { Contact, SuccessContactsResponse } from "utils/types"
import { contactValidation, getQueryParamsValidation } from "utils/validation"

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getHandler(req, res)
      break
    case "POST":
      await postHandler(req, res)
      break
    default:
      throw new MethodNotAllowedError()
  }
}

const getHandler: NextApiHandler<SuccessContactsResponse> = async (
  req,
  res
) => {
  const contactsDAO = await setUpContactsDAO()

  const params = await getQueryParamsValidation.validate(req.query)

  const result = await contactsDAO.getContacts(params)

  res.status(200).json({ ...result })
}

const postHandler: NextApiHandler<Contact> = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  const contact = await contactValidation.validate(req.body)

  const contactId = await contactsDAO.addContact(contact)

  res.status(201).json({ ...contact, _id: contactId })
}

export default catchErrors(handler)
