import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import useSyncContactResults from "client/common/useSyncContactResults"
import { useContactResultsSelector } from "client/features/contacts/contactResultsSlice"
import ContactList from "./ContactList"
import ShowMoreButton from "./ShowMoreButton"

const ContactListContainer: React.FC = () => {
  useSyncContactResults()

  const { isFetching, isUninitialized } = useSearchBarContactsQuery()

  const { contacts, count } = useContactResultsSelector()
  const allContactsShown = contacts.length == count

  return (
    <main>
      <ContactList contacts={contacts} />

      {!isUninitialized && !allContactsShown && (
        <ShowMoreButton isFetching={isFetching} />
      )}

      <style jsx>
        {`
          main {
            padding: 0.5rem 1rem 1rem 1rem;
          }

          @media screen and (min-width: 600px) {
            main {
              padding: 0.5rem 2rem;
            }
          }
        `}
      </style>
    </main>
  )
}

export default ContactListContainer
