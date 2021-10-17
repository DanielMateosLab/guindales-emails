import { Fab } from "@material-ui/core"
import { Add } from "@material-ui/icons"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const AddContactButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Fab
      aria-label="Añadir contacto"
      className="add-contact-button"
      color="primary"
      onClick={onClick}
    >
      <Add />

      <style jsx>
        {`
          :global(.add-contact-button) {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
          }
        `}
      </style>
    </Fab>
  )
}

export default AddContactButton
