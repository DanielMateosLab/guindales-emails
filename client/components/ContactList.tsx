import { useAppSelector } from "../hooks/reduxHooks"
import ContactItem from "./ContactItem"

const ContactList: React.FC = () => {
  const contacts = useAppSelector((state) => state.contactResults.contacts)

  return (
    <section aria-label="lista de emails">
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact._id} />
      ))}
    </section>
  )
}

export default ContactList
