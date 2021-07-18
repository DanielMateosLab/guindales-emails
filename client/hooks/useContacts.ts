import { useEffect, useReducer } from "react"
import { pageSize } from "../../utils/config"
import { Contact, ContactsResponse, ContactsSortQuery } from "../../utils/types"

interface State {
  data: {
    contacts: Contact[]
    contactsCount: number | undefined
  }
  isLoading: boolean
  isError: boolean
  queryParams: string
}

type Action =
  | {
      type: "CONTACTS_PENDING"
    }
  | { type: "CONTACTS_ERROR" }
  | { type: "CONTACTS_SUCCESS"; payload: State["data"] }
  | { type: "FETCH_MORE" }
  | { type: "RELOAD" }
  | { type: "UPDATE_SORT"; payload: ContactsSortQuery }

const contactsReducer = (state: State, action: Action): State => {
  let params: URLSearchParams
  switch (action.type) {
    case "CONTACTS_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      }
    case "CONTACTS_ERROR":
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    case "CONTACTS_SUCCESS":
      const oldContacts = state.data.contacts
      const newContacts = action.payload.contacts
      const newContactsCount = action.payload.contactsCount

      const getContactsIds = (contacts: Contact[]): string[] =>
        contacts.map((contact) => contact._id)

      const oldContactsIds = getContactsIds(oldContacts)
      const newContactsIds = getContactsIds(newContacts)

      let mergedContacts: Contact[] = [...oldContacts]

      newContactsIds.forEach((id, i) => {
        const isNewId = !oldContactsIds.includes(id)

        if (isNewId) {
          mergedContacts.push(newContacts[i])
        }
      })

      return {
        ...state,
        data: {
          contactsCount: newContactsCount,
          contacts: mergedContacts,
        },
        isError: false,
        isLoading: false,
      }

    case "FETCH_MORE":
      params = new URLSearchParams(state.queryParams)
      const contactsLength = state.data.contacts.length

      const currentPage = Math.trunc(contactsLength / pageSize)
      const newPage = currentPage + 1

      params.set("page", newPage.toString())
      // Clean up reload attempts
      params.delete("r")

      return {
        ...state,
        queryParams: params.toString(),
      }

    case "RELOAD":
      params = new URLSearchParams(state.queryParams)

      let reloadAttempt = Number(params.get("r"))
      reloadAttempt++

      params.set("r", reloadAttempt.toString())

      return {
        ...state,
        queryParams: params.toString(),
      }

    case "UPDATE_SORT":
      params = new URLSearchParams(state.queryParams)

      params.set("sort", JSON.stringify(action.payload))

      return {
        ...state,
        data: {
          contacts: [],
          contactsCount: state.data.contactsCount,
        },
        queryParams: params.toString(),
      }
  }
}

const initialState: State = {
  data: {
    contactsCount: undefined,
    contacts: [],
  },
  isError: false,
  isLoading: false,
  queryParams: "",
}

const useContacts = () => {
  const [state, dispatch] = useReducer<typeof contactsReducer>(
    contactsReducer,
    initialState
  )

  useEffect(() => {
    // Allow us to abort HTTP requests
    const controller = new AbortController()
    let componentIsMounted = true

    /** Avoid dispatching actions in unmounted components */
    const enhancedDispatch = (action: Action) =>
      componentIsMounted && dispatch(action)

    async function fetchContacts() {
      enhancedDispatch({ type: "CONTACTS_PENDING" })

      try {
        const url =
          "/api/contacts" + (state.queryParams ? "?" + state.queryParams : "")

        const res: ContactsResponse = await fetch(url, {
          signal: controller.signal,
        }).then((res) => res.json())

        if (res.status == "success") {
          const { contacts, count: contactsCount } = res
          enhancedDispatch({
            type: "CONTACTS_SUCCESS",
            payload: { contacts, contactsCount },
          })
        } else {
          enhancedDispatch({ type: "CONTACTS_ERROR" })
        }
      } catch (error) {
        enhancedDispatch({ type: "CONTACTS_ERROR" })
      }
    }

    fetchContacts()

    return () => {
      componentIsMounted = false
      controller.abort()
    }
  }, [state.queryParams])

  return {
    state,
    dispatch,
  }
}

export default useContacts
