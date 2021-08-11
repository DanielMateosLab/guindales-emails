import { useGetContactsQuery } from "../redux/apiSlice"
import { useContactResultsSelector } from "../redux/contactResultsSlice"

const useSearchBarContactsQuery = () => {
  const { page, sort } = useContactResultsSelector()

  const result = useGetContactsQuery({
    page,
    sort,
  })

  return result
}

export default useSearchBarContactsQuery
