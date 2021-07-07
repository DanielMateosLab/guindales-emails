import {
  AppBar,
  Container,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import ContactList from "../client/components/ContactList"
import DatabaseErrorAlert from "../client/components/DatabaseErrorAlert"
import { Contact, ContactsResponse } from "../utils/types"

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsCount, setContactsCount] = useState<number | undefined>(
    undefined
  )
  const [loadingContacts, setLoading] = useState(true)
  const [contactsError, setError] = useState(false)

  useEffect(() => {
    async function fetchContacts() {
      const res: ContactsResponse = await fetch("/api/contacts").then((res) =>
        res.json()
      )

      if (res.status == "success") {
        setContacts(res.contacts)
        setContactsCount(res.count)
      }
      if (res.status == "error") {
        setError(true)
      }

      setLoading(false)
    }

    fetchContacts()
  }, [])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Emails</Typography>
        </Toolbar>
      </AppBar>

      <div className="header">
        <Typography variant="body1">
          Emails encontrados: {contactsCount}
        </Typography>
        {contactsError && <DatabaseErrorAlert />}
      </div>

      <Container component="main">
        {loadingContacts ? (
          <LinearProgress color="secondary" />
        ) : (
          <ContactList contacts={contacts} />
        )}
      </Container>

      <style jsx>
        {`
          .header {
            padding: 1rem;
            background-color: rgba(98, 172, 110, 0.2);
          }
        `}
      </style>
    </div>
  )
}
