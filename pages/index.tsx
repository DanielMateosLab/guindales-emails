import { LinearProgress } from "@material-ui/core"
import { useEffect } from "react"
import ContactList from "../client/components/ContactList"
import ContactListContainer from "../client/components/ContactListContainer"
import Header from "../client/components/Header"
import ShowMoreButton from "../client/components/ShowMoreButton"
import { useAppDispatch, useAppSelector } from "../client/hooks/reduxHooks"
import { useGetContactsQuery } from "../client/redux/apiSlice"
import { updateResults } from "../client/redux/contactResultsSlice"

export default function Home() {
  const { contacts, count, page, sort } = useAppSelector(
    (state) => state.contactResults
  )

  const { data, isFetching, isUninitialized } = useGetContactsQuery({
    page,
    sort,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    data && dispatch(updateResults(data))
  }, [data])

  const allContactsShown = contacts.length == count

  return (
    <div className="root">
      <Header />

      <ContactListContainer>
        {isFetching && <LinearProgress color="secondary" />}

        <ContactList contacts={contacts} />

        {!isUninitialized && !allContactsShown && (
          <ShowMoreButton isFetching={isFetching} />
        )}
      </ContactListContainer>
    </div>
  )
}
