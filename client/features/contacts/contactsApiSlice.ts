import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Contact,
  ContactsParams,
  SuccessContactsResponse,
  WithoutId,
} from "utils/types"
import removeDefaultParams from "./removeDefaultParams"

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<SuccessContactsResponse, ContactsParams>({
      query: (params) => ({
        url: "contacts",
        params: removeDefaultParams(params),
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
