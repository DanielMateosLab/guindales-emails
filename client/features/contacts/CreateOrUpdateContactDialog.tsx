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
import { useAppDispatch } from "client/common/reduxHooks"
import TextField from "client/common/TextField"
import { Form, Formik, FormikHelpers } from "formik"
import React, { forwardRef, useState } from "react"
import { Contact } from "utils/types"
import { addContactValidation } from "utils/validation"
import { updateContactResult } from "./contactResultsSlice"
import {
  useAddContactMutation,
  useUpdateContactByIdMutation,
} from "./contactsApiSlice"
import NewContactCreatedOrUpdatedText from "./NewContactCreatedOrUpdatedText"
import parseFieldErrors from "./parseFieldErrors"

const SlideTransition = forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />)

/** Dialog to update or create a new contact.
 * - If a contact prop is provided it will be updated.
 * If no contact is provided one will be created.
 * - Uses Render Props Technique in the children to provide the dialog trigger element.
 * */
const CreateOrUpdateContactDialog: React.FC<{
  contact?: Contact
  children: (
    openDialog: React.MouseEventHandler<HTMLButtonElement>
  ) => JSX.Element
}> = ({ contact, children }) => {
  const formInitialValues = contact
    ? { name: contact.name, email: contact.email, phone: contact.phone || "" }
    : { name: "", email: "", phone: "" }

  // isNewDialog flag avoids new dialogs from showing success or error messages
  // from old api calls.
  const [isNewDialog, setIsNew] = useState(true)
  const [open, setOpen] = useState(false)
  function handleClose() {
    setIsNew(true)
    setOpen(false)
  }

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [addOrUpdateContact, { isLoading, isError, data }] = contact
    ? useUpdateContactByIdMutation()
    : useAddContactMutation()

  const [hasFieldErrors, setHasFieldErrors] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = async (
    values: typeof formInitialValues,
    { setSubmitting, setFieldError }: FormikHelpers<typeof formInitialValues>
  ) => {
    const mutationPayload = contact
      ? { _id: contact._id, updateData: values }
      : values

    addOrUpdateContact(mutationPayload as any)
      .unwrap()
      .then((newContact) => {
        if (contact) {
          dispatch(updateContactResult(newContact))
        }
      })
      .catch((err) => {
        setHasFieldErrors(!!err.data.fieldErrors)
        parseFieldErrors(err, setFieldError)
      })

    setIsNew(false)

    setSubmitting(false)
  }

  return (
    <>
      {children(() => setOpen(true))}

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
          validationSchema={addContactValidation}
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
                    className="app-bar-title dialog-title"
                  >
                    {contact ? "Editar" : "Nuevo"} Contacto
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

              <main className="app-container dialog-form">
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

                {!isNewDialog && data && (
                  <NewContactCreatedOrUpdatedText
                    updated={!!contact}
                    contact={data}
                  />
                )}

                {!isNewDialog && isError && !hasFieldErrors && (
                  <Typography color="error">
                    Debido a un error desconocido no se ha podido{" "}
                    {contact ? "modificar" : "añadir"} el usuario. Vuelve a
                    intentarlo más tarde.
                  </Typography>
                )}
              </main>
            </Form>
          )}
        </Formik>
      </Dialog>
      <style global jsx>{`
        .dialog-title {
          margin-inline: 1rem;
        }

        .dialog-form {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 1rem;
          max-width: 600px;
          margin: auto;
        }

        .dialog-form label {
          color: ${theme.palette.secondary.dark};
          margin-bottom: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default CreateOrUpdateContactDialog
