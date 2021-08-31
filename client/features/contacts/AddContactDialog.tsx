import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import CloseIcon from "@material-ui/icons/Close"
import { forwardRef, useState } from "react"
import AddContactButton from "./AddContactButton"

const SlideTransition = forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const AddContactDialog: React.FC = ({}) => {
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <AddContactButton onClick={() => setOpen(true)} />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <AppBar component="section">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="cerrar"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h1" className="app-bar-title">
              Nuevo Contacto
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <main className="app-container"></main>
      </Dialog>
    </>
  )
}

export default AddContactDialog
