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
import useContacts from "../client/hooks/useContacts"
import theme from "../client/theme"

export default function Home() {
  const { state, reLoad, fetchMore } = useContacts()

  const { contacts, contactsCount } = state.data
  const allContactsShown = state.data.contacts.length >= (contactsCount || 0)

  return (
    <div className="root">
      <header className="app-bar">
        <AppBar position="relative" component="section">
          <Toolbar>
            <Typography variant="h6">Emails</Typography>
          </Toolbar>
        </AppBar>

        <section className="secondary-bar">
          <FoundResultsText
            contactsLength={contacts.length}
            count={contactsCount}
          />

          {state.isError && <DatabaseErrorAlert reLoad={reLoad} />}
        </section>
      </header>

      <main className="contact-list-container">
        {state.isLoading && <LinearProgress color="secondary" />}

        <ContactList contacts={contacts} />

        {!allContactsShown && (
          <div className="show-more-button">
            <Button
              disabled={state.isLoading}
              variant="contained"
              color="primary"
              onClick={fetchMore}
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
            padding: .5rem 1rem 0}
          }

          header {
            background-color: ${theme.palette.primary.light};
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
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
