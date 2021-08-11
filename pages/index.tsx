import { useEffect } from "react"
import ContactListContainer from "../client/components/ContactListContainer"
import Header from "../client/components/Header"
import { useAppDispatch } from "../client/hooks/reduxHooks"
import useSearchBarContactsQuery from "../client/hooks/useSearchBarContactsQuery"
import { updateResults } from "../client/redux/contactResultsSlice"

export default function Home() {
  const { data } = useSearchBarContactsQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    data && dispatch(updateResults(data))
  }, [data])

  return (
    <div>
      <Header />

      <ContactListContainer />
    </div>
  )
}
