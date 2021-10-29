import { updateResults } from "client/features/contacts/contactResultsSlice"
import { useEffect } from "react"
import { useAppDispatch } from "./reduxHooks"
import useSearchBarContactsQuery from "./useSearchBarContactsQuery"

/**
 * Takes the results from the getContactsQuery, called with the search bar params, and updates
 * the contacts results data (infinite scrolling feature)
 */
const useSyncContactResults = () => {
  const { data } = useSearchBarContactsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    data && dispatch(updateResults(data))
  }, [data])
}

export default useSyncContactResults
