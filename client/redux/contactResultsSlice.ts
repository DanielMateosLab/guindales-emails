import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { pageSize } from "../../utils/config"
import { Contact } from "../../utils/types"

interface ContactsState {
  contacts: Contact[]
  count: number
  page: number
}

const initialState: ContactsState = {
  count: 0,
  contacts: [],
  page: 1,
}

const contactsSlice = createSlice({
  name: "contactResults",
  initialState,
  reducers: {
    addResults(
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
    resetResults() {
      return initialState
    },
    updatePage(state) {
      state.page = Math.trunc(state.contacts.length / pageSize) + 1
    },
  },
})

export const { addResults, resetResults, updatePage } = contactsSlice.actions

export default contactsSlice.reducer
