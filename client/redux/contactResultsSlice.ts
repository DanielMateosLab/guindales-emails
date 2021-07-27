import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { pageSize } from "../../utils/config"
import { Contact, ContactsSortQuery } from "../../utils/types"

interface ContactsState {
  contacts: Contact[]
  count: number
  page: number
  sort: ContactsSortQuery
}

const initialState: ContactsState = {
  count: 0,
  contacts: [],
  page: 1,
  sort: {
    field: "_id",
    order: -1,
  },
}

const contactsSlice = createSlice({
  name: "contactResults",
  initialState,
  reducers: {
    updateResults(
      state,
      {
        payload: { contacts, count },
      }: PayloadAction<{
        contacts: Contact[]
        count: number
      }>
    ) {
      const contactIds = state.contacts.map((contact) => contact._id)
      contacts.forEach((contact) => {
        if (!contactIds.includes(contact._id)) {
          state.contacts.push(contact)
        }
      })

      state.count = count
    },
    updatePage(state) {
      state.page = Math.trunc(state.contacts.length / pageSize) + 1
    },
    updateSort(_, action: PayloadAction<ContactsSortQuery>) {
      return { ...initialState, sort: action.payload }
    },
  },
})

export const { updateResults, updatePage, updateSort } = contactsSlice.actions

export default contactsSlice.reducer
