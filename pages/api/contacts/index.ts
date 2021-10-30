import { MethodNotAllowedError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiHandler } from "next"
import setUpContactsDAO from "server/setUpContactsDAO"
import { getUserIdFromRequestSession } from "server/utils"
import {
  Contact,
  ContactsEmailsResponse,
  SuccessContactsResponse,
} from "utils/types"
import {
  addContactValidation,
  getQueryParamsValidation,
} from "utils/validation"

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

const getHandler: NextApiHandler<
  SuccessContactsResponse | ContactsEmailsResponse
> = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  const { allEmails, ...restOfParams } = req.query

  const params = await getQueryParamsValidation.validate(restOfParams)
  const user_id = await getUserIdFromRequestSession(req)

  const result = allEmails
    ? await contactsDAO.getAllEmailsByUserId(user_id, params)
    : await contactsDAO.getContactsByUserId(user_id, params)

  res.status(200).json({ ...result })
}

const postHandler: NextApiHandler<Contact> = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  const contact = await addContactValidation.validate(req.body)
  const user_id = await getUserIdFromRequestSession(req)

  const contactId = await contactsDAO.addContact({ ...contact, user_id })

  res.status(201).json({ ...contact, _id: contactId, user_id })
}

export default catchErrors(handler)
