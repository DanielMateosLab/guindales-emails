import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Db } from "mongodb"
import { pageSize } from "utils/config"
import { Contact, ContactsParams, WithoutId } from "utils/types"

export default class ContactsDAO extends CollectionDAO<Contact> {
  constructor(db: Db) {
    super(db, "contacts")
  }

  async getContacts({
    filter,
    sortField = "_id",
    sortOrder = -1,
    page = 1,
  }: Partial<ContactsParams>): Promise<{
    contacts: Contact[]
    count: number
  }> {
    const cursor = this.collection
      .find(filter ? { $text: { $search: filter } } : {})
      .sort({ [sortField]: sortOrder })
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
