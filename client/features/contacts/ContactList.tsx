import { HttpContact } from "utils/types"
import ContactItem from "./ContactItem"

const ContactList: React.FC<{ contacts: HttpContact[] }> = ({ contacts }) => (
  <section aria-label="lista de emails">
    {contacts.map((contact) => (
      <ContactItem contact={contact} key={contact._id} />
    ))}
  </section>
)

export default ContactList
