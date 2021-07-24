import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactsResponse, ContactsSortQuery } from "../../utils/types"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<
      ContactsResponse,
      { page: number; sort: ContactsSortQuery }
    >({
      query: ({ page, sort }) => {
        const queryParams = new URLSearchParams()
        queryParams.set("page", page.toString())
        queryParams.set("sort", JSON.stringify(sort))

        return `contacts?` + queryParams.toString()
      },
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
