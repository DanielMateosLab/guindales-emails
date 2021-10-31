import Header from "client/common/Header"
import AddContactButton from "client/features/contacts/AddContactButton"
import ContactListContainer from "client/features/contacts/ContactListContainer"
import CreateOrUpdateContactDialog from "client/features/contacts/CreateOrUpdateContactDialog"

export default function Home() {
  return (
    <div>
      <Header />

      <ContactListContainer />
      <CreateOrUpdateContactDialog>
        {(openDialog) => <AddContactButton onClick={openDialog} />}
      </CreateOrUpdateContactDialog>
    </div>
  )
}
