import { AppBar, Container, Toolbar, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import ContactList from "../client/components/ContactList"
import { Contact, ContactsResponse } from "../utils/types"

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsCount, setContactsCount] = useState(0)

  useEffect(() => {
    async function fetchContacts() {
      const res: ContactsResponse = await fetch("/api/contacts").then((res) =>
        res.json()
      )

      if (res.status == "success") {
        setContacts(res.contacts)
        setContactsCount(res.count)
      }
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
        <ContactList contacts={contacts} />
      </Container>

      <style jsx>
        {`
          :global(.emails-count) {
            margin-top: 1rem;
          }
        `}
      </style>
    </div>
  )
}
