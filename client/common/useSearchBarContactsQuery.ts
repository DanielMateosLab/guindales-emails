import { useParamsOfContactResultsSelector } from "client/features/contacts/contactResultsSlice"
import { useGetContactsQuery } from "client/features/contacts/contactsApiSlice"

const useSearchBarContactsQuery = () => {
  const { page, sort } = useParamsOfContactResultsSelector()

  const result = useGetContactsQuery({
    page,
    sort,
  })

  return result
}

export default useSearchBarContactsQuery
