import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Contact,
  ContactsParams,
  SuccessContactsResponse,
  WithoutId,
} from "utils/types"
import removeDefaultParams from "./removeDefaultParams"

const contactListTag: FullTagDescription<"Contacts"> = {
  type: "Contacts",
  id: "LIST",
}

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
      providesTags: [contactListTag],
    }),
    addContact: builder.mutation<Contact, WithoutId<Contact>>({
      query: (contact) => ({
        url: "contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: [contactListTag],
    }),
    deleteContactById: builder.mutation<void, string>({
      query: (_id) => ({
        url: `contacts/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [contactListTag],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactByIdMutation,
} = contactsApi
