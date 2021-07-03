import { ApiResponse, connectToDb } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import type { NextApiRequest, NextApiResponse } from "next"
import ContactsDAO from "../../server/ContactsDAO"
import { ContactsResponse } from "../../utils/types"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ContactsResponse>>
) {
  const db = await connectToDb()
  const contactsDAO = new ContactsDAO(db)

  if (req.method == "GET") {
    // TODO: set up filter, sort and pagination via query parameters. Add validation
    const result = await contactsDAO.getContacts()
    res.status(200).json({ status: "success", ...result })
  }
}

export default catchErrors(handler)
