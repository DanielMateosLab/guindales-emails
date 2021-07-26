import {
  AppBar,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core"
import ContactList from "../client/components/ContactList"
import DatabaseErrorAlert from "../client/components/DatabaseErrorAlert"
import FoundResultsText from "../client/components/FoundResultsText"
import { useGetContactsQuery } from "../client/redux/apiSlice"
import theme from "../client/theme"
import { Contact } from "../utils/types"

export default function Home() {
  const { data, isError, isFetching, refetch, isUninitialized } =
    useGetContactsQuery({
      page: 1,
      sort: {
        field: "_id",
        order: -1,
      },
    })

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const contacts: Contact[] = data ? data.contacts : []
  const allContactsShown = data ? data.contacts.length >= data.count : true

  return (
    <div className="root">
      <header className="app-bar">
        <AppBar position="relative" component="section">
          <Toolbar>
            <Typography variant="h6" component="h1" className="app-bar-title">
              Emails
            </Typography>
          </Toolbar>
        </AppBar>

        <section className="secondary-bar">
          {/* <SortSettings dispatch={dispatch} /> */}

          <FoundResultsText
            contactsLength={contacts.length}
            count={data?.count}
          />

          {isError && <DatabaseErrorAlert reFetch={refetch} />}
        </section>
      </header>

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
                // dispatch({ type: "FETCH_MORE" })
              }}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </main>

      <style jsx>
        {`
          .secondary-bar {
            padding: 1rem;
          }
          .contact-list-container {
            padding: .5rem 1rem 1rem 1rem}
          }

          header {
            background-color: ${theme.palette.primary.light};
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
          }

          :global(.app-bar-title) {
            flex-grow: 1;
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
