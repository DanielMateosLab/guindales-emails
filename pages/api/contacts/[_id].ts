import { MethodNotAllowedError, UserNotFoundError } from "@danielmat/api-utils"
import catchErrors from "@danielmat/api-utils/dist/catchErrors"
import { NextApiHandler } from "next"
import setUpContactsDAO from "server/setUpContactsDAO"

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteHandler(req, res)
      break
    default:
      throw new MethodNotAllowedError()
  }
}

const deleteHandler: NextApiHandler = async (req, res) => {
  const contactsDAO = await setUpContactsDAO()

  const _id = typeof req.query._id == "string" ? req.query._id : ""

  const success = await contactsDAO.deleteContactById(_id)

  if (success) {
    res.status(204)
  } else {
    throw new UserNotFoundError()
  }
}

export default catchErrors(handler)
