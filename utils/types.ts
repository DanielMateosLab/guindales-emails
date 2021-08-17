export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
}

export interface SuccessContactsResponse {
  contacts: Contact[]
  count: number
}

export interface FailContactsResponse<FieldErrors = undefined> {
  message: string
  /** Used in forms field validation or to give more details */
  fieldErrors?: FieldErrors
}

export interface ContactsSortQuery {
  field: "_id" | "name"
  order: 1 | -1
}
export type ContactsDAOSortQuery = { name: number } | { _id: number }

export type ContactsFilter = Partial<Omit<Contact, "_id">>
