import { LinearProgress } from "@material-ui/core"
import useSearchBarContactsQuery from "../hooks/useSearchBarContactsQuery"
import useSyncContactResults from "../hooks/useSyncContactResults"
import { useContactResultsSelector } from "../redux/contactResultsSlice"
import ContactList from "./ContactList"
import ShowMoreButton from "./ShowMoreButton"

const ContactListContainer: React.FC = () => {
  useSyncContactResults()

  const { isFetching, isUninitialized } = useSearchBarContactsQuery()

  const { contacts, count } = useContactResultsSelector()
  const allContactsShown = contacts.length == count

  return (
    <main>
      {isFetching && <LinearProgress color="secondary" />}

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
              padding: 0.5rem 2rem 0;
            }
          }
        `}
      </style>
    </main>
  )
}

export default ContactListContainer
