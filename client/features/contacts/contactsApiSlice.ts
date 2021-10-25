import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Contact,
  ContactsEmailsParams,
  ContactsParams,
  SuccessContactsResponse,
  UpdateContactData,
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
    getContactsEmails: builder.query<string[], ContactsEmailsParams>({
      query: (params) => ({
        url: "contacts",
        params: {
          ...removeDefaultParams(params),
          allEmails: true,
        },
      }),
    }),
    addContact: builder.mutation<Contact, WithoutId<Contact>>({
      query: (contact) => ({
        url: "contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: [contactListTag],
    }),
    updateContactById: builder.mutation<
      Contact,
      { _id: string; updateData: UpdateContactData }
    >({
      query: ({ _id, updateData }) => ({
        url: `contacts/${_id}`,
        method: "PUT",
        body: updateData,
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
  useUpdateContactByIdMutation,
  useGetContactsEmailsQuery,
} = contactsApi
