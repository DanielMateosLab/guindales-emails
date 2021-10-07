import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Contact,
  ContactsSortQuery,
  SuccessContactsResponse,
  WithoutId,
} from "utils/types"

// TODO: parse the query params so if they match the default values #6
// (page = 1, filter = "", sort ~= _id, -1) they are not sent in the request

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Contacts"],
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
      providesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    addContact: builder.mutation<Contact, WithoutId<Contact>>({
      query: (contact) => ({
        url: "contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
  }),
})

export const { useGetContactsQuery, useAddContactMutation } = contactsApi
