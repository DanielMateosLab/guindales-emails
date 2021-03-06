import { FullTagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  ContactsEmailsParams,
  ContactsEmailsResponse,
  ContactsParams,
  HttpContact,
  SuccessContactsResponse,
  UpdateContactData,
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
    getContactsEmails: builder.query<
      ContactsEmailsResponse,
      ContactsEmailsParams
    >({
      query: (params) => ({
        url: "contacts",
        params: {
          ...removeDefaultParams(params),
          allEmails: 1,
        },
      }),
    }),
    addContact: builder.mutation<
      HttpContact,
      Pick<HttpContact, "name" | "email" | "phone">
    >({
      query: (contact) => ({
        url: "contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: [contactListTag],
    }),
    updateContactById: builder.mutation<
      HttpContact,
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
  useLazyGetContactsEmailsQuery,
} = contactsApi
