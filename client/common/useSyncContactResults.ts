import { updateResults } from "client/features/contacts/contactResultsSlice"
import { useEffect } from "react"
import { useAppDispatch } from "./reduxHooks"
import useSearchBarContactsQuery from "./useSearchBarContactsQuery"

const useSyncContactResults = () => {
  const { data } = useSearchBarContactsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    data && dispatch(updateResults(data))
  }, [data])
}

export default useSyncContactResults
