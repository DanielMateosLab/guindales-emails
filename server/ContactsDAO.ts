import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Cursor, Db } from "mongodb"
import { pageSize } from "../utils/config"
import { Contact } from "../utils/types"

export default class ContactsDAO extends CollectionDAO<Contact> {
  constructor(db: Db) {
    super(db, "contacts")
  }

  async getContacts(
    filter: Partial<Omit<Contact, "_id">> = {},
    sort: Parameters<Cursor<Contact>["sort"]>[0] = { _id: -1, name: 1 },
    page: number = 1
  ): Promise<{ contacts: Contact[]; count: number }> {
    const cursor = this.collection
      .find(filter)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(page * pageSize)

    const contacts = await cursor.toArray()
    const count = await cursor.count()

    return { contacts, count }
  }
}
