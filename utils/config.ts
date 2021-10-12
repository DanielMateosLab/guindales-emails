import { Contact, ContactsParams } from "./types"

export const pageSize: number = 10

export const validSortFields: Array<keyof Contact> = ["_id", "name"]
export const validSortOrders = [1, -1]

export const contactResultsDefaultParams: ContactsParams = {
  page: 1,
  sortField: "_id",
  sortOrder: -1,
  filter: "",
}
