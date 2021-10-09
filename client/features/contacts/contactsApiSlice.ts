import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Contact,
  ContactsQueryParams,
  SuccessContactsResponse,
  WithoutId,
} from "utils/types"
import removeDefaultParamsAndStringifySort from "./removeDefaultParamsAndStringifySort"

// TODO: parse the query params so if they match the default values #6
// (page = 1, filter = "", sort ~= _id, -1) they are not sent in the request

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<SuccessContactsResponse, ContactsQueryParams>({
      query: (params) => ({
        url: "contacts",
        params: removeDefaultParamsAndStringifySort(params),
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
