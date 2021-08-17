import { useParamsOfContactResultsSelector } from "client/features/contacts/contactResultsSlice"
import { useGetContactsQuery } from "client/features/contacts/contactsApiSlice"

const useSearchBarContactsQuery = () => {
  const params = useParamsOfContactResultsSelector()

  const result = useGetContactsQuery(params)

  return result
}

export default useSearchBarContactsQuery
