import { useGetContactsQuery } from "../redux/apiSlice"
import { useAppSelector } from "./reduxHooks"

const useSearchBarContactsQuery = () => {
  const { page, sort } = useAppSelector((state) => state.contactResults)

  const result = useGetContactsQuery({
    page,
    sort,
  })

  return result
}

export default useSearchBarContactsQuery
