import { useEffect, useReducer, useState } from "react"
import { Contact, ContactsResponse } from "../../utils/types"

interface State {
  data: {
    contacts: Contact[]
    contactsCount: number | undefined
  }
  isLoading: boolean
  isError: boolean
}

type Action =
  | {
      type: "CONTACTS_PENDING"
    }
  | { type: "CONTACTS_ERROR" }
  | { type: "CONTACTS_SUCCESS"; payload: State["data"] }

const contactsReducer = (state: State, action: Action): State => {
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
        data: {
          contactsCount: newContactsCount,
          contacts: mergedContacts,
        },
        isError: false,
        isLoading: false,
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
}

const useContacts = () => {
  const [url, setUrl] = useState("/api/contacts")

  const [fetchCount, setFetchCount] = useState(0)
  function reLoad() {
    setUrl((url) => {
      const queryString = url.match(/(?<=\?).*/) ?? [""]

      const queryParams = new URLSearchParams(queryString[0])
      queryParams.set("r", fetchCount.toString())

      return "/api/contacts?" + queryParams.toString()
    })

    setFetchCount(fetchCount + 1)
  }

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
  }, [url])

  return { state, setUrl, reLoad }
}

export default useContacts
