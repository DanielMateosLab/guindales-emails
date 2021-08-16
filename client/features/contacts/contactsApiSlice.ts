import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactsSortQuery, SuccessContactsResponse } from "utils/types"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<
      SuccessContactsResponse,
      { page: number; sort: ContactsSortQuery }
    >({
      query: ({ page, sort }) => ({
        url: "contacts",
        params: {
          page,
          sort: JSON.stringify(sort),
        },
      }),
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi
