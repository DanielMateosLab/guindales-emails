import {
  ApiResponse,
  connectToDb,
  MethodNotAllowedError,
} from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiRequest, NextApiResponse } from "next"
import ContactsDAO from "../../server/ContactsDAO"
import { ContactsResponse } from "../../utils/types"
import {
  getContactsQueryParametersValidation,
  removeUndefinedProperties,
} from "../../utils/validation"

interface ContactsHandler {
  (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<ContactsResponse>>
  ): Promise<void>
}

const handler: ContactsHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getHandler(req, res)
      break
    default:
      throw new MethodNotAllowedError()
  }
}

const getHandler: ContactsHandler = async (req, res) => {
  const db = await connectToDb()
  const contactsDAO = new ContactsDAO(db)

  const { filter, sort, page } =
    await getContactsQueryParametersValidation.validate(req.query)

  const result = await contactsDAO.getContacts(
    removeUndefinedProperties(filter),
    removeUndefinedProperties(sort),
    page
  )

  res.status(200).json({ status: "success", ...result })
}

export default catchErrors(handler)
