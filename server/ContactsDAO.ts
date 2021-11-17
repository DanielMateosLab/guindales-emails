import { InternalServerError } from "@danielmat/api-utils"
import CollectionDAO from "@danielmat/api-utils/dist/CollectionDAO"
import { Db, FilterQuery, ObjectId } from "mongodb"
import { pageSize } from "utils/config"
import {
  Contact,
  ContactsEmailsParams,
  ContactsEmailsResponse,
  ContactsParams,
  UpdateContactData,
  WithoutId,
} from "utils/types"

export default class ContactsDAO extends CollectionDAO<Contact> {
  constructor(db: Db) {
    super(db, "contacts")

    // TODO: move this logic into a compile or deploy hook
    this.collection.indexes().then((indexes) => {
      const requiredIndex = "user_id_1_name_text_email_text_phone_text"

      const indexNames: string[] = indexes.map((index: any) => index.name)
      if (!indexNames.includes(requiredIndex)) {
        throw new InternalServerError(
          `"contacts" collection is missing the required index "${requiredIndex}"`
        )
      }
    })
  }

  async getContactsByUserId(
    user_id: ObjectId,
    {
      filter,
      sortField = "_id",
      sortOrder = -1,
      page = 1,
    }: Partial<ContactsParams>
  ): Promise<{
    contacts: Contact[]
    count: number
  }> {
    const cursor = this.collection
      .find(processFilterQuery(user_id, filter))
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    const contacts = await cursor.toArray()
    const count = await cursor.count()

    return { contacts, count }
  }

  async getAllEmailsByUserId(
    user_id: ObjectId,
    { filter, sortField = "_id", sortOrder = -1 }: Partial<ContactsEmailsParams>
  ): Promise<ContactsEmailsResponse> {
    const pipeline = [
      { $match: processFilterQuery(user_id, filter) },
      { $sort: { [sortField]: sortOrder } },
      {
        $group: {
          _id: null,
          contacts: { $push: "$email" },
        },
      },
      { $project: { _id: 0 } },
    ]

    // If there are no contacts the result will be an empty {},
    // so ContactsEmailsResponse is typed as Partial
    const result = (await this.collection
      .aggregate(pipeline)
      .next()) as unknown as ContactsEmailsResponse | null

    return result || { contacts: [] }
  }

  async getContactUserId(_id: ObjectId): Promise<ObjectId | undefined> {
    const result = await this.collection.findOne(
      { _id },
      {
        projection: {
          _id: 0,
          user_id: 1,
        },
      }
    )

    return result?.user_id
  }

  /** Adds a contact and returns the generated _id */
  async addContact(contact: WithoutId<Contact>): Promise<ObjectId> {
    const result = await this.collection.insertOne(contact)

    return result.insertedId
  }

  async updateContactById(
    _id: ObjectId,
    updatedData: UpdateContactData
  ): Promise<Contact | undefined> {
    const result = await this.collection.findOneAndUpdate(
      {
        _id,
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
  async deleteContactById(_id: ObjectId): Promise<boolean> {
    const result = await this.collection.deleteOne({
      _id,
    })

    return result.deletedCount == 1
  }
}

function processFilterQuery(
  user_id: ObjectId,
  filter?: string
): FilterQuery<Contact> {
  const filterQuery: FilterQuery<Contact> = { user_id }

  if (filter) {
    filterQuery.$text = { $search: filter }
  }

  return filterQuery
}
