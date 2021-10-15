import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import CloseIcon from "@material-ui/icons/Close"
import TextField from "client/common/TextField"
import { Form, Formik, FormikHelpers } from "formik"
import { forwardRef, useState } from "react"
import { contactValidation } from "utils/validation"
import AddContactButton from "./AddContactButton"
import { useAddContactMutation } from "./contactsApiSlice"
import NewContactCreatedText from "./NewContactCreatedText"
import parseFieldErrors from "./parseFieldErrors"

const SlideTransition = forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const formInitialValues = { name: "", email: "", phone: "" }

const AddContactDialog: React.FC = ({}) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  function handleClose() {
    setOpen(false)
  }

  const [addContact, { isLoading, isError, data }] = useAddContactMutation()

  const [hasFieldErrors, setHasFieldErrors] = useState(false)

  const handleSubmit = async (
    values: typeof formInitialValues,
    { setSubmitting, setFieldError }: FormikHelpers<typeof formInitialValues>
  ) => {
    addContact(values)
      .unwrap()
      .catch((err) => {
        setHasFieldErrors(!!err.data.fieldErrors)
        parseFieldErrors(err, setFieldError)
      })

    setSubmitting(false)
  }

  return (
    <>
      <AddContactButton onClick={() => setOpen(true)} />

      <Dialog
        open={open}
        fullScreen={isSmallScreen}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="xs"
      >
        <Formik
          initialValues={formInitialValues}
          validationSchema={contactValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <AppBar position="relative" component="section">
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="cerrar"
                  >
                    <CloseIcon />
                  </IconButton>

                  <Typography
                    variant="h6"
                    component="h1"
                    className="app-bar-title add-contact-title"
                  >
                    Nuevo Contacto
                  </Typography>

                  <Button
                    autoFocus
                    color="inherit"
                    type="submit"
                    disabled={formik.isSubmitting || isLoading}
                  >
                    Guardar
                  </Button>
                </Toolbar>
              </AppBar>

              <main className="app-container add-contact-form">
                <TextField label="Nombre" name="name" placeholder="Jhon Doe" />
                <TextField
                  label="Email"
                  name="email"
                  placeholder="jhon_doe@example.com"
                />
                <TextField
                  label="Teléfono"
                  name="phone"
                  placeholder="34 685 546 387"
                />

                {data && <NewContactCreatedText {...data} />}

                {isError && !hasFieldErrors && (
                  <Typography color="error">
                    Debido a un error desconocido no se ha podido añadir el
                    usuario. Vuelve a intentarlo más tarde.
                  </Typography>
                )}
              </main>
            </Form>
          )}
        </Formik>
      </Dialog>
      <style global jsx>{`
        .add-contact-title {
          margin-inline: 1rem;
        }

        .add-contact-form {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 1rem;
          max-width: 600px;
          margin: auto;
        }

        .add-contact-form label {
          color: ${theme.palette.secondary.dark};
          margin-bottom: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default AddContactDialog
