import { ApiResponse } from "@danielmat/api-utils"

export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
}

export type ContactsResponse = ApiResponse<{
  contacts: Contact[]
  count: number
}>
