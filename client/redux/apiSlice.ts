import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactsSortQuery, SuccessContactsResponse } from "../../utils/types"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    fetchFn: process.env.NODE_ENV == "test" ? require("node-fetch") : undefined,
  }),
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
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
