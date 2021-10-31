import {
  Button,
  Dialog,
  IconButton,
  LinearProgress,
  Typography,
} from "@material-ui/core"
import { FileCopy } from "@material-ui/icons"
import theme from "client/app/theme"
import DatabaseErrorAlert from "client/common/DatabaseErrorAlert"
import DialogController from "client/common/DialogController"
import DialogHeader from "client/common/DialogHeader"
import { useState } from "react"
import {
  useContactResultsSelector,
  useGetContactsEmailsParamsSelector,
} from "./contactResultsSlice"
import { useLazyGetContactsEmailsQuery } from "./contactsApiSlice"
import EmailsCopiedText from "./EmailsCopiedText"

const AllContactsDialog: React.FC = () => {
  const params = useGetContactsEmailsParamsSelector()
  const [fetch, { data, isError }] = useLazyGetContactsEmailsQuery()

  const allEmails = data?.contacts.join("; ")

  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(allEmails || "").then(() => setCopied(true))
  }

  const { count } = useContactResultsSelector()

  return (
    <>
      <DialogController>
        {({ openDialog, ...dialogProps }) => (
          <>
            {count > 0 && (
              <Button
                size="small"
                className="see-all-button"
                onClick={() => {
                  openDialog()
                  fetch(params)
                }}
              >
                Ver todos
              </Button>
            )}

            <Dialog {...dialogProps} fullScreen>
              <DialogHeader
                title="Todos los resultados"
                onClose={dialogProps.onClose}
              >
                <IconButton aria-label="Copiar todos" onClick={handleCopy}>
                  <FileCopy />
                </IconButton>
              </DialogHeader>

              {!data && !isError && <LinearProgress color="secondary" />}

              <main className="app-container">
                {copied && <EmailsCopiedText />}

                {data && <Typography> {allEmails} </Typography>}

                {isError && <DatabaseErrorAlert refetch={fetch} />}
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
