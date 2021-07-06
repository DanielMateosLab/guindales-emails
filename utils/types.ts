export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
}

export interface ContactsResponse {
  contacts: Contact[]
  count: number
}
