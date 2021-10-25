import { Button, Dialog, LinearProgress, Typography } from "@material-ui/core"
import theme from "client/app/theme"
import DatabaseErrorAlert from "client/common/DatabaseErrorAlert"
import DialogController from "client/common/DialogController"
import DialogHeader from "client/common/DialogHeader"
import { useGetContactsEmailsParamsSelector } from "./contactResultsSlice"
import { useGetContactsEmailsQuery } from "./contactsApiSlice"

const AllContactsDialog: React.FC = () => {
  const params = useGetContactsEmailsParamsSelector()
  const { data, isError, refetch } = useGetContactsEmailsQuery(params)

  return (
    <>
      <DialogController>
        {({ openDialog, ...dialogProps }) => (
          <>
            <Button
              size="small"
              className="see-all-button"
              onClick={openDialog}
            >
              Ver todos
            </Button>

            <Dialog {...dialogProps} fullScreen>
              <DialogHeader
                title="Todos los resultados"
                onClose={dialogProps.onClose}
              />
              {!data && !isError && <LinearProgress color="secondary" />}

              <main className="app-container">
                {data && <Typography> {data.contacts.join("; ")} </Typography>}

                {isError && <DatabaseErrorAlert refetch={refetch} />}
              </main>
            </Dialog>
          </>
        )}
      </DialogController>

      <style global jsx>
        {`
          .see-all-button {
            color: ${theme.palette.secondary.dark};
          }
        `}
      </style>
    </>
  )
}

export default AllContactsDialog
