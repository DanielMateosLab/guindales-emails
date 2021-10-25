import { Slide } from "@material-ui/core"
import { forwardRef, useState } from "react"
import { TransitionProps } from "react-transition-group/Transition"

const TransitionComponent = forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />)

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

  return <>{children({ openDialog, onClose, open, TransitionComponent })}</>
}

export default DialogController
