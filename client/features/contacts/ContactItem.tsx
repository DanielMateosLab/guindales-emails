import Typography from "@material-ui/core/Typography"
import Divider from "client/common/Divider"
import { Contact } from "utils/types"

const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => (
  <article>
    <div className="main-content">
      <input type="checkbox" />
      <div className="contact-details">
        <Typography variant="body1">{contact.name}</Typography>
        <Typography variant="body1" color="secondary">
          {contact.email}
        </Typography>
        <Typography variant="body2" color="secondary">
          {contact.phone}
        </Typography>
      </div>
    </div>
    <Divider />

    <style jsx>
      {`
        .main-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        @media screen and (min-width: 600px) {
          article {
            display: grid;
            grid-template-columns: 2fr 3fr 1fr;
            margin-top: 1rem;
          }
        }
      `}
    </style>
  </article>
)

export default ContactItem
