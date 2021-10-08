import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Db } from "mongodb"
import { pageSize } from "utils/config"
import { Contact, ContactsDAOSortQuery, WithoutId } from "utils/types"

export default class ContactsDAO extends CollectionDAO<Contact> {
  constructor(db: Db) {
    super(db, "contacts")
  }

  async getContacts(
    filter?: string,
    sort: ContactsDAOSortQuery = { _id: -1 },
    page: number = 1
  ): Promise<{ contacts: Contact[]; count: number }> {
    const cursor = this.collection
      .find(filter ? { $text: { $search: filter } } : {})
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    const contacts = await cursor.toArray()
    const count = await cursor.count()

    return { contacts, count }
  }

  /** Adds a contact and returns the generated _id */
  async addContact(contact: WithoutId<Contact>): Promise<string> {
    // Have to use "as any" in insertOne params to avoid the required _id field"
    const result = await this.collection.insertOne(contact as any)

    return result.insertedId
  }
}
