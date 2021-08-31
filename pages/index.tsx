import Header from "client/common/Header"
import AddContactDialog from "client/features/contacts/AddContactDialog"
import ContactListContainer from "client/features/contacts/ContactListContainer"

export default function Home() {
  return (
    <div>
      <Header />

      <ContactListContainer />
      <AddContactDialog />
    </div>
  )
}
