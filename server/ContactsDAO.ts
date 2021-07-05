import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Cursor, Db } from "mongodb"
import { pageSize } from "../utils/config"
import { Contact } from "../utils/types"

export default class ContactsDAO extends CollectionDAO<Contact> {
  constructor(db: Db) {
    super(db, "contacts")
  }

  async getContacts({
    filter = {},
    sort = { _id: -1, name: 1 },
    page = 1,
  }: GetContactsArgs): Promise<{ contacts: Contact[]; count: number }> {
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

interface GetContactsArgs {
  filter?: Partial<Omit<Contact, "_id">>
  sort?: Parameters<Cursor<Contact>["sort"]>[0]
  page?: number
}
