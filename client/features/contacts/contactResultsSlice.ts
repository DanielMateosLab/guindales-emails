import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { RootState } from "client/app/store"
import { useAppSelector } from "client/common/reduxHooks"
import { contactResultsDefaultParams, pageSize } from "utils/config"
import { Contact, ContactsSortParams } from "utils/types"

const contactsAdapter = createEntityAdapter<Contact>({
  selectId: (contact) => contact._id,
})

export interface ContactsState {
  data: {
    contacts: ReturnType<typeof contactsAdapter.getInitialState>
    // This is the total contacts count in the DB, not the above contacts length.
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
    contacts: contactsAdapter.getInitialState(),
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
      contactsAdapter.setMany(state.data.contacts, contacts)

      state.data.count = count
    },
    deleteContactResultById(state, action: PayloadAction<string>) {
      contactsAdapter.removeOne(state.data.contacts, action.payload)
    },
    updateContactResult(state, action: PayloadAction<Contact>) {
      const { _id: id, ...changes } = action.payload
      contactsAdapter.updateOne(state.data.contacts, { id, changes })
    },

    updatePage(state) {
      state.params.page =
        Math.trunc(state.data.contacts.ids.length / pageSize) + 1
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

export const {
  updateResults,
  updatePage,
  updateSort,
  updateFilter,
  updateContactResult,
  deleteContactResultById,
} = contactsSlice.actions

export default contactsSlice.reducer

const contactSelectors = contactsAdapter.getSelectors<RootState>(
  (state) => state.contactResults.data.contacts
)

export const useContactResultsSelector: () => {
  contacts: Contact[]
  count: number
} = () =>
  useAppSelector((state) => ({
    count: state.contactResults.data.count,
    contacts: contactSelectors.selectAll(state),
  }))

export const useParamsOfContactResultsSelector = () =>
  useAppSelector((state) => state.contactResults.params)
