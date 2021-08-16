import { useGetContactsQuery } from "../redux/apiSlice"
import { useParamsOfContactResultsSelector } from "../redux/contactResultsSlice"

const useSearchBarContactsQuery = () => {
  const { page, sort } = useParamsOfContactResultsSelector()

  const result = useGetContactsQuery({
    page,
    sort,
  })

  return result
}

export default useSearchBarContactsQuery
