import { ContactsState } from "client/features/contacts/contactResultsSlice"

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

export type WithoutId<T> = Omit<T, "_id">

export type ContactsParams = ContactsState["params"]

export type ContactsSortParams = Pick<ContactsParams, "sortField" | "sortOrder">

export type UpdateContactData = Partial<WithoutId<Contact>>
