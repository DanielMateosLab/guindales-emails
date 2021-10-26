import AddContactButton from "client/features/contacts/AddContactButton"
import ContactListContainer from "client/features/contacts/ContactListContainer"
import CreateOrUpdateContactDialog from "client/features/contacts/CreateOrUpdateContactDialog"

export default function Dashboard() {
  // TODO: redirect to index page if there is no session
  // OR return the checking credentials component as body and redirect only if it fails
  return (
    <div>
      <ContactListContainer />
      <CreateOrUpdateContactDialog>
        {(openDialog) => <AddContactButton onClick={openDialog} />}
      </CreateOrUpdateContactDialog>
    </div>
  )
}
