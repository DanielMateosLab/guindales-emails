import { useParamsOfContactResultsSelector } from "../features/contacts/contactResultsSlice"
import { useGetContactsQuery } from "../features/contacts/contactsApiSlice"

const useSearchBarContactsQuery = () => {
  const { page, sort } = useParamsOfContactResultsSelector()

  const result = useGetContactsQuery({
    page,
    sort,
  })

  return result
}

export default useSearchBarContactsQuery
