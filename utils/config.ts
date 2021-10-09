import { Contact, ContactsQueryParams } from "./types"

export const pageSize: number = 10

export const validSortFields: Array<keyof Contact> = ["_id", "name"]
export const validSortOrders = [1, -1]

export const contactResultsDefaultParams: ContactsQueryParams = {
  page: 1,
  sort: {
    field: "_id",
    order: -1,
  },
  filter: "",
}
