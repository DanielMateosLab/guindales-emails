import CheckingSession from "client/common/CheckingSession"
import AddContactButton from "client/features/contacts/AddContactButton"
import ContactListContainer from "client/features/contacts/ContactListContainer"
import CreateOrUpdateContactDialog from "client/features/contacts/CreateOrUpdateContactDialog"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  // TODO: redirect to index page if there is no session
  // OR return the checking credentials component as body and redirect only if it fails
  const { status } = useSession({ required: false })

  if (status == "loading") return <CheckingSession />

  return (
    <div>
      <ContactListContainer />
      <CreateOrUpdateContactDialog>
        {(openDialog) => <AddContactButton onClick={openDialog} />}
      </CreateOrUpdateContactDialog>
    </div>
  )
}
