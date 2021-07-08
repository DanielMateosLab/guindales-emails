import { AppBar, LinearProgress, Toolbar, Typography } from "@material-ui/core"
import ContactList from "../client/components/ContactList"
import DatabaseErrorAlert from "../client/components/DatabaseErrorAlert"
import useContacts from "../client/hooks/useContacts"
import theme from "../client/theme"

export default function Home() {
  const { state, setUrl, reLoad } = useContacts()

  return (
    <div className="root">
      <header className="app-bar">
        <AppBar position="relative" component="section">
          <Toolbar>
            <Typography variant="h6">Emails</Typography>
          </Toolbar>
        </AppBar>

        <section className="secondary-bar">
          <Typography variant="body1">
            {/* Mostrando 10 de 1000 mails econtrados... */}
            Emails encontrados: {state.data.contactsCount}
          </Typography>
          {state.isError && <DatabaseErrorAlert reLoad={reLoad} />}
        </section>
      </header>
      <main className="contact-list-container">
        {state.isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <ContactList contacts={state.data.contacts} />
        )}
      </main>

      <style jsx>
        {`
          .secondary-bar {
            padding: 1rem;
            background-color: ${theme.palette.primary.light};
          }
          .contact-list-container {
            padding: .5rem 1rem 0}
          }

          header {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
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
