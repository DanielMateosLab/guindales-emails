import {
  AppBar,
  Container,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import ContactList from "../client/components/ContactList"
import { Contact, ContactsResponse } from "../utils/types"

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsCount, setContactsCount] = useState<number | undefined>(
    undefined
  )
  const [loadingContacts, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContacts() {
      const res: ContactsResponse = await fetch("/api/contacts").then((res) =>
        res.json()
      )

      if (res.status == "success") {
        setContacts(res.contacts)
        setContactsCount(res.count)
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
      <Container component="main">
        <Typography variant="body1" className="emails-count">
          Emails encontrados: {contactsCount}
        </Typography>
        {loadingContacts ? (
          <LinearProgress color="secondary" />
        ) : (
          <ContactList contacts={contacts} />
        )}
      </Container>

      <style jsx>
        {`
          :global(.emails-count) {
            margin: 1rem 0;
          }
        `}
      </style>
    </div>
  )
}
