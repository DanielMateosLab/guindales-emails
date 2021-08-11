import { useEffect } from "react"
import { updateResults } from "../redux/contactResultsSlice"
import { useAppDispatch } from "./reduxHooks"
import useSearchBarContactsQuery from "./useSearchBarContactsQuery"

const useSyncInfiniteScrollingContactList = () => {
  const { data } = useSearchBarContactsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    data && dispatch(updateResults(data))
  }, [data])
}

export default useSyncInfiniteScrollingContactList
