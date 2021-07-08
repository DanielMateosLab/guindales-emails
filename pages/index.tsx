import { AppBar, LinearProgress, Toolbar, Typography } from "@material-ui/core"
import ContactList from "../client/components/ContactList"
import DatabaseErrorAlert from "../client/components/DatabaseErrorAlert"
import useContacts from "../client/hooks/useContacts"

export default function Home() {
  const { state, setUrl, reLoad } = useContacts()

  return (
    <div>
      {/* TODO: Make both app bars sticky and respondant to scrolling.
       */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Emails</Typography>
        </Toolbar>
      </AppBar>

      <div className="header">
        <Typography variant="body1">
          {/* Mostrando 10 de 1000 mails econtrados... */}
          Emails encontrados: {state.data.contactsCount}
        </Typography>
        {state.isError && <DatabaseErrorAlert reLoad={reLoad} />}
      </div>

      <main className="contact-list-container">
        {state.isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <ContactList contacts={state.data.contacts} />
        )}
      </main>

      <style jsx>
        {`
          .header {
            padding: 1rem;
            background-color: rgba(98, 172, 110, 0.2);
          }
          .contact-list-container {
            padding: .5rem 1rem 0}
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
