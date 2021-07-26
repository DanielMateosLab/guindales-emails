import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Contact } from "../../utils/types"

interface ContactsState {
  contacts: Contact[]
  count: number
}

const initialState: ContactsState = {
  count: 0,
  contacts: [],
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
  },
})

export const { addResults, resetResults } = contactsSlice.actions

export default contactsSlice.reducer
