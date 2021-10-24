import { Button, Dialog, Slide } from "@material-ui/core"
import theme from "client/app/theme"
import { forwardRef, useState } from "react"
import { TransitionProps } from "react-transition-group/Transition"

type Props = {
  children: (dialogHelpers: {
    openDialog: () => void
    onClose: () => void
    open: boolean
    TransitionComponent: any
  }) => JSX.Element
} & { [key: string]: any }

const DialogController: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false)

  function openDialog() {
    setOpen(true)
  }
  function onClose() {
    setOpen(false)
  }

  const TransitionComponent = forwardRef<
    unknown,
    TransitionProps & { children?: React.ReactElement }
  >((props, ref) => <Slide direction="up" ref={ref} {...props} />)

  return <>{children({ openDialog, onClose, open, TransitionComponent })}</>
}

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
              Todos los emails
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
