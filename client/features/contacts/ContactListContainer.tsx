import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import useSyncContactResults from "client/common/useSyncContactResults"
import { useContactResultsSelector } from "client/features/contacts/contactResultsSlice"
import ContactList from "./ContactList"
import ShowMoreButton from "./ShowMoreButton"

const ContactListContainer: React.FC = () => {
  useSyncContactResults()

  const { isUninitialized } = useSearchBarContactsQuery()

  const { contacts, count } = useContactResultsSelector()
  const allContactsShown = contacts.length == count

  return (
    <main className="app-container">
      <ContactList contacts={contacts} />

      {!isUninitialized && !allContactsShown && <ShowMoreButton />}
      <style global jsx>
        {`
          .app-container {
            padding: 0.5rem 1rem 1rem 1rem;
          }

          @media screen and (min-width: 600px) {
            .app-container {
              padding: 0.5rem 2rem;
            }
          }
        `}
      </style>
    </main>
  )
}

export default ContactListContainer
