import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Db, ObjectId } from "mongodb"
import { pageSize } from "utils/config"
import {
  Contact,
  ContactsParams,
  UpdateContactData,
  WithoutId,
} from "utils/types"

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

  async updateContactById(
    _id: string,
    updatedData: UpdateContactData
  ): Promise<Contact | undefined> {
    const result = await this.collection.findOneAndUpdate(
      {
        _id: new ObjectId(_id) as any,
      },
      {
        $set: {
          ...updatedData,
        },
      },
      { returnDocument: "after" }
    )
    return result.value
  }

  /**
   * Removes the contact with the given id.
   * Returns true if one contact was deleted or false otherwise.
   */
  async deleteContactById(_id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({
      _id: new ObjectId(_id) as any,
    })

    return result.deletedCount == 1
  }
}
