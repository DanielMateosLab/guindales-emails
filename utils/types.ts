import { ApiResponse } from "@danielmat/api-utils"

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

export type ContactsResponse = ApiResponse<SuccessContactsResponse>

export interface ContactsSortQuery {
  field: string
  order: number
}
export type ContactsDAOSortQuery = { name: number } | { _id: number }
