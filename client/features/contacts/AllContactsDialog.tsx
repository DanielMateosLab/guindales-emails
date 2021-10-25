import { Button, Dialog } from "@material-ui/core"
import theme from "client/app/theme"
import DialogController from "client/common/DialogController"
import DialogHeader from "client/common/DialogHeader"

const AllContactsDialog: React.FC = () => {
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
