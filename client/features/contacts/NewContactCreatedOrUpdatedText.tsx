import { Typography } from "@material-ui/core"
import { Done } from "@material-ui/icons"
import theme from "client/app/theme"
import { Contact } from "utils/types"

const NewContactCreatedOrUpdatedText: React.FC<{
  contact: Contact
  updated?: boolean
}> = ({ updated, contact: { name, email, phone } }) => (
  <div className="root">
    <Done style={{ color: theme.palette.success.dark }} fontSize="large" />
    <Typography>
      Se ha {updated ? "modificado" : "añadido"} correctamente el contacto{" "}
      <b>{name} </b>
      con email <b> {email}</b>
      {phone && (
        <span>
          {" "}
          y teléfono <b>{phone}</b>
        </span>
      )}
      .
    </Typography>

    <style jsx>
      {`
        .root {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}
    </style>
  </div>
)

export default NewContactCreatedOrUpdatedText
