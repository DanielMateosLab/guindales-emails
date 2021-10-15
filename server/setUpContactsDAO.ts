import { connectToDb } from "@danielmat/api-utils"
import ContactsDAO from "./ContactsDAO"

export default async function setUpContactsDAO() {
  const db = await connectToDb()
  return new ContactsDAO(db)
}
