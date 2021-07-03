export interface Contact {
  _id: string
  name: string
  email: string
  phone?: number
}

export interface ContactsResponse {
  contacts: Contact[]
  count: number
}
