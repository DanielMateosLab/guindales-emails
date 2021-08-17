import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  ContactsFilter,
  ContactsSortQuery,
  SuccessContactsResponse,
} from "utils/types"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<
      SuccessContactsResponse,
      { page: number; sort: ContactsSortQuery; filter: ContactsFilter }
    >({
      query: ({ page, sort, filter }) => ({
        url: "contacts",
        params: {
          page,
          sort: JSON.stringify(sort),
          filter: JSON.stringify(filter),
        },
      }),
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
