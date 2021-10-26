import CheckingSession from "client/common/CheckingSession"
import useIsAuthenticated from "client/common/useIsAuthenticated"
import AddContactButton from "client/features/contacts/AddContactButton"
import ContactListContainer from "client/features/contacts/ContactListContainer"
import CreateOrUpdateContactDialog from "client/features/contacts/CreateOrUpdateContactDialog"

const Dashboard: React.FC = () => {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated)
    return (
      <div>
        <ContactListContainer />
        <CreateOrUpdateContactDialog>
          {(openDialog) => <AddContactButton onClick={openDialog} />}
        </CreateOrUpdateContactDialog>
      </div>
    )

  return <CheckingSession redirectUnauthenticated />
}

export default Dashboard
