import { IconButton, Tooltip } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Delete from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Divider from "client/common/Divider"
import { useAppDispatch } from "client/common/reduxHooks"
import { deleteContactResultById } from "client/features/contacts/contactResultsSlice"
import React from "react"
import { Contact } from "utils/types"
import { useDeleteContactByIdMutation } from "./contactsApiSlice"

const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => {
  const email = contact.email
  const isLongEmail = email.length >= 25
  const shortenEmail = (email: string): string =>
    email.slice(0, 25).concat("...")

  const [deleteContact, { isLoading: deleteIsLoading }] =
    useDeleteContactByIdMutation()

  const dispatch = useAppDispatch()

  function handleDeleteClick() {
    deleteContact(contact._id)
      .unwrap()
      .then(() => {
        dispatch(deleteContactResultById(contact._id))
      })
  }

  return (
    <article>
      <div className="main-content">
        <div className="contact-details">
          <Typography variant="body1">{contact.name}</Typography>

          <Typography variant="body1" color="secondary">
            {isLongEmail ? (
              <Tooltip title={email}>
                <span>{shortenEmail(email)}</span>
              </Tooltip>
            ) : (
              email
            )}
          </Typography>

          <Typography variant="body2" color="secondary">
            {contact.phone}
          </Typography>
        </div>
        <div className="action-buttons">
          <IconButton
            color="secondary"
            aria-label="update-contact"
            size="small"
            className="first-button"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete-contact"
            size="small"
            onClick={handleDeleteClick}
            disabled={deleteIsLoading}
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      <Divider />

      <style jsx>
        {`
          .main-content {
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
            gap: 1rem;
          }
          .contact-details {
            flex-grow: 1;
          }
          :global(.first-button) {
            margin-right: 0.5rem;
          }
          @media screen and (min-width: 600px) {
            .main-content {
              margin-top: 1rem;
            }
            .contact-details {
              display: grid;
              grid-template-columns: 2fr 3fr 1fr;
              align-items: center;
              gap: 1rem;
            }
          }
        `}
      </style>
    </article>
  )
}

export default ContactItem
