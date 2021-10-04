import { connectToDb, MethodNotAllowedError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiHandler } from "next"
import ContactsDAO from "server/ContactsDAO"
import { Contact, SuccessContactsResponse } from "utils/types"
import { getQueryValidation } from "utils/validation"

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

  const { filter, sort, page } = await getQueryValidation.validate(req.query)

  const result = await contactsDAO.getContacts(
    filter,
    { [sort.field]: sort.order } as any,
    page
  )

  res.status(200).json({ ...result })
}

const postHandler: NextApiHandler<Contact> = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  // TODO: finish postHandler and keep going with contactsApiSlice
}

async function setUpContactsDAO() {
  const db = await connectToDb()
  return new ContactsDAO(db)
}

export default catchErrors(handler)
