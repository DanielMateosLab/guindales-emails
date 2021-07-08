import Typography from "@material-ui/core/Typography"
import { Contact } from "../../utils/types"
import Divider from "./Divider"

const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => (
  <article>
    <Typography variant="body1">{contact.name}</Typography>
    <Typography variant="body1" color="secondary">
      {contact.email}
    </Typography>
    <Typography variant="body2" color="secondary">
      {contact.phone}
    </Typography>
    <Divider />

    <style jsx>
      {`
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
