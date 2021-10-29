import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import useSyncContactResults from "client/common/useSyncContactResults"
import { useContactResultsSelector } from "client/features/contacts/contactResultsSlice"
import ContactList from "./ContactList"
import ShowMoreButton from "./ShowMoreButton"

const ContactListContainer: React.FC = () => {
  useSyncContactResults()

  const { contacts, count } = useContactResultsSelector()

  const allContactsShown = contacts.length == count
  const { isUninitialized } = useSearchBarContactsQuery()

  return (
    <main className="app-container">
      <ContactList contacts={contacts} />

      {!isUninitialized && !allContactsShown && <ShowMoreButton />}
    </main>
  )
}

export default ContactListContainer
