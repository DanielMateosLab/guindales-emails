import { ObjectId } from "bson"
import { initialMenuState } from "client/common/menuReducer"
import { ContactsState } from "client/features/contacts/contactResultsSlice"

export interface Contact {
  _id: ObjectId
  user_id: ObjectId
  name: string
  email: string
  phone?: string
}

export interface User {
  _id: ObjectId
  name?: string
  email?: string
}

export interface SuccessContactsResponse {
  contacts: Contact[]
  count: number
}

export interface ContactsEmailsResponse {
  contacts: string[]
}

export interface FailContactsResponse<FieldErrors = undefined> {
  message: string
  /** Used in forms field validation or to give more details */
  fieldErrors?: FieldErrors
}

export type WithoutId<T> = Omit<T, "_id">

export type ContactsParams = ContactsState["params"]
export type ContactsEmailsParams = Omit<ContactsState["params"], "page">

export type ContactsSortParams = Pick<ContactsParams, "sortField" | "sortOrder">

export type UpdateContactData = Partial<WithoutId<Contact>>

// Menu Reducer
export type MenuState = typeof initialMenuState
export type MenuReducerAction = {
  type: "switchMenu"
  payload: keyof MenuState
}
export interface SwitchMenu {
  (menu: keyof MenuState): void
}
