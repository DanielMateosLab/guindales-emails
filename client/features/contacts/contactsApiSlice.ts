import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactsSortQuery, SuccessContactsResponse } from "utils/types"

// TODO: parse the query params so if they match the default values
// (page = 1, filter = "", sort ~= _id, -1) they are not sent in the request

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<
      SuccessContactsResponse,
      { page: number; sort: ContactsSortQuery; filter: string }
    >({
      query: ({ page, sort, filter }) => ({
        url: "contacts",
        params: {
          page,
          sort: JSON.stringify(sort),
          filter,
        },
      }),
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
