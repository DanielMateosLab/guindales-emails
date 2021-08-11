import { LinearProgress } from "@material-ui/core"
import { useAppSelector } from "../hooks/reduxHooks"
import { useGetContactsQuery } from "../redux/apiSlice"
import ContactList from "./ContactList"
import ShowMoreButton from "./ShowMoreButton"

const ContactListContainer: React.FC = () => {
  const { contacts, count, page, sort } = useAppSelector(
    (state) => state.contactResults
  )

  const { isFetching, isUninitialized } = useGetContactsQuery({
    page,
    sort,
  })

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
