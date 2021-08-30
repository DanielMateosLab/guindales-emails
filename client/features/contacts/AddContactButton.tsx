import { Fab } from "@material-ui/core"
import { Add } from "@material-ui/icons"

const AddContactButton: React.FC = () => {
  return (
    <Fab
      aria-label="Añadir contacto"
      className="add-contact-button"
      color="primary"
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
