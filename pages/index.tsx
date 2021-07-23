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
import SortSettings from "../client/components/SortSettings"
import useContacts from "../client/hooks/useContacts"
import theme from "../client/theme"

export default function Home() {
  // TODO: add redux, simplify and refactor code
  const { state, dispatch } = useContacts()

  const { contacts, contactsCount } = state.data
  const allContactsShown = state.data.contacts.length >= (contactsCount || 0)

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
          <SortSettings dispatch={dispatch} />

          <FoundResultsText
            contactsLength={contacts.length}
            count={contactsCount}
          />

          {state.isError && (
            <DatabaseErrorAlert reLoad={() => dispatch({ type: "RELOAD" })} />
          )}
        </section>
      </header>

      <main className="contact-list-container">
        {state.isLoading && <LinearProgress color="secondary" />}

        <ContactList contacts={contacts} />

        {contactsCount && !allContactsShown && (
          <div className="show-more-button">
            <Button
              disabled={state.isLoading}
              variant="contained"
              color="primary"
              onClick={() => dispatch({ type: "FETCH_MORE" })}
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
