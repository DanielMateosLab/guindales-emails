import { useEffect } from "react"
import ContactListContainer from "../client/components/ContactListContainer"
import Header from "../client/components/Header"
import { useAppDispatch, useAppSelector } from "../client/hooks/reduxHooks"
import { useGetContactsQuery } from "../client/redux/apiSlice"
import { updateResults } from "../client/redux/contactResultsSlice"

export default function Home() {
  const { page, sort } = useAppSelector((state) => state.contactResults)

  const { data } = useGetContactsQuery({
    page,
    sort,
  })

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
