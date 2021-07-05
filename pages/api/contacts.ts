import { ApiResponse, connectToDb } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiRequest, NextApiResponse } from "next"
import ContactsDAO from "../../server/ContactsDAO"
import { ContactsResponse } from "../../utils/types"
import { getContactsQueryParametersValidation } from "../../utils/validation"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ContactsResponse>>
) {
  const db = await connectToDb()
  const contactsDAO = new ContactsDAO(db)

  if (req.method == "GET") {
    const { page, sort } = await getContactsQueryParametersValidation.validate(
      req.query
    )

    const result = await contactsDAO.getContacts({ page, sort })

    res.status(200).json({ status: "success", ...result })
  }
}

export default catchErrors(handler)
