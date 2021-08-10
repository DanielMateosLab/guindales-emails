import { Button, LinearProgress } from "@material-ui/core"
import { useEffect } from "react"
import ContactList from "../client/components/ContactList"
import Header from "../client/components/Header"
import { useAppDispatch, useAppSelector } from "../client/hooks/reduxHooks"
import { useGetContactsQuery } from "../client/redux/apiSlice"
import { updatePage, updateResults } from "../client/redux/contactResultsSlice"

export default function Home() {
  const { contacts, count, page, sort } = useAppSelector(
    (state) => state.contactResults
  )

  const { data, isError, isFetching, refetch, isUninitialized, isLoading } =
    useGetContactsQuery({
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
      <Header {...{ isLoading, isError, refetch }} />

      <main className="contact-list-container">
        {isFetching && <LinearProgress color="secondary" />}

        <ContactList contacts={contacts} />

        {!isUninitialized && !allContactsShown && (
          <div className="show-more-button">
            <Button
              disabled={isFetching}
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(updatePage())
              }}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </main>

      <style jsx>
        {`
          .contact-list-container {
            padding: .5rem 1rem 1rem 1rem}
          }

          .show-more-button {
            margin: 1rem 0;
            display: flex;
            justify-content: center;
          }

          @media screen and (min-width: 600px) {
           .contact-list-container {
            padding: .5rem 2rem 0}
          } 
          }
        `}
      </style>
    </div>
  )
}
