import { Button, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogController from "client/common/DialogController"
import DialogHeader from "client/common/DialogHeader"
import { useAppDispatch } from "client/common/reduxHooks"
import TextField from "client/common/TextField"
import { Form, Formik, FormikHelpers } from "formik"
import React, { useState } from "react"
import { Contact } from "utils/types"
import { addContactValidation } from "utils/validation"
import { updateContactResult } from "./contactResultsSlice"
import {
  useAddContactMutation,
  useUpdateContactByIdMutation,
} from "./contactsApiSlice"
import NewContactCreatedOrUpdatedText from "./NewContactCreatedOrUpdatedText"
import parseFieldErrors from "./parseFieldErrors"

/** Dialog to update or create a new contact.
 * - If a contact prop is provided it will be updated.
 * If no contact is provided one will be created.
 * - Uses Render Props Technique in the children to provide the dialog trigger element.
 * */
const CreateOrUpdateContactDialog: React.FC<{
  contact?: Contact
  children: (openDialog: () => void) => JSX.Element
}> = ({ contact, children }) => {
  // Declare style vars
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  // Initiate form state
  const formInitialValues = contact
    ? {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "",
      }
    : { name: "", email: "", phone: "" }
  const [hasFieldErrors, setHasFieldErrors] = useState(false)

  // Get store state and functions. If there is a contact we call the update
  // mutation, if not, the add mutation
  const [addOrUpdateContact, { isLoading, isError, data }] = contact
    ? useUpdateContactByIdMutation()
    : useAddContactMutation()
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

    setSubmitting(false)
  }

  return (
    <DialogController>
      {({ openDialog, ...dialogHelpers }) => (
        <>
          {children(openDialog)}

          <Dialog
            fullScreen={isSmallScreen}
            fullWidth
            maxWidth="xs"
            {...dialogHelpers}
          >
            <Formik
              initialValues={formInitialValues}
              validationSchema={addContactValidation}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                // isSubmitted flag prevents us showing success or error messages
                // from old Dialogs. This messages' data is fetched from the store
                // when the Dialog is created
                const isSubmitted = formik.submitCount > 0

                return (
                  <Form>
                    <DialogHeader
                      onClose={dialogHelpers.onClose}
                      title={(contact ? "Editar" : "Nuevo") + " Contacto"}
                    >
                      <Button
                        autoFocus
                        color="inherit"
                        type="submit"
                        disabled={formik.isSubmitting || isLoading}
                      >
                        Guardar
                      </Button>
                    </DialogHeader>

                    <main className="app-container dialog-form">
                      <TextField
                        label="Nombre"
                        name="name"
                        placeholder="Jhon Doe"
                      />
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

                      {isSubmitted && data && (
                        <NewContactCreatedOrUpdatedText
                          updated={!!contact}
                          contact={data}
                        />
                      )}

                      {isSubmitted && isError && !hasFieldErrors && (
                        <Typography color="error">
                          Debido a un error desconocido no se ha podido{" "}
                          {contact ? "modificar" : "añadir"} el usuario. Vuelve
                          a intentarlo más tarde.
                        </Typography>
                      )}
                    </main>
                  </Form>
                )
              }}
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
      )}
    </DialogController>
  )
}

export default CreateOrUpdateContactDialog
