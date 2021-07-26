import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactsSortQuery, SuccessContactsResponse } from "../../utils/types"
import { addResults } from "./contactResultsSlice"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<
      SuccessContactsResponse,
      { page: number; sort: ContactsSortQuery }
    >({
      query: ({ page, sort }) => {
        const queryParams = new URLSearchParams()
        queryParams.set("page", page.toString())
        queryParams.set("sort", JSON.stringify(sort))

        return `contacts?` + queryParams.toString()
      },
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { contacts, count } }) => {
            dispatch(addResults({ contacts, count }))
          })
          .catch(() => {})
      },
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
