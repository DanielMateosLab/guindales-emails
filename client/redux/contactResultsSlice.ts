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
      state.contacts.push(...contacts)
      state.count = count
    },
    resetResults() {
      return initialState
    },
  },
})

export const { addResults, resetResults } = contactsSlice.actions

export default contactsSlice.reducer
