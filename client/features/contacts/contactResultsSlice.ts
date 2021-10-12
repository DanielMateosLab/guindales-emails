import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "client/common/reduxHooks"
import { contactResultsDefaultParams, pageSize } from "utils/config"
import { Contact, ContactsSortParams } from "utils/types"

export interface ContactsState {
  data: {
    contacts: Contact[]
    count: number
  }
  params: {
    page: number
    sortField: "_id" | "name"
    sortOrder: 1 | -1
    filter: string
  }
}

const initialState: ContactsState = {
  data: {
    count: 0,
    contacts: [],
  },
  params: contactResultsDefaultParams,
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
      const contactIds = state.data.contacts.map((contact) => contact._id)
      contacts.forEach((contact) => {
        if (!contactIds.includes(contact._id)) {
          state.data.contacts.push(contact)
        }
      })

      state.data.count = count
    },
    updatePage(state) {
      state.params.page = Math.trunc(state.data.contacts.length / pageSize) + 1
    },
    updateSort(state, action: PayloadAction<ContactsSortParams>) {
      state.data = initialState.data

      state.params.page = 1

      state.params.sortField = action.payload.sortField
      state.params.sortOrder = action.payload.sortOrder
    },
    updateFilter(state, action: PayloadAction<string>) {
      if (state.params.filter === "" && action.payload === "") return

      state.data = initialState.data
      state.params.page = 1

      state.params.filter = action.payload
    },
  },
})

export const { updateResults, updatePage, updateSort, updateFilter } =
  contactsSlice.actions

export default contactsSlice.reducer

export const useContactResultsSelector = () =>
  useAppSelector((state) => state.contactResults.data)

export const useParamsOfContactResultsSelector = () =>
  useAppSelector((state) => state.contactResults.params)
