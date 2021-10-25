import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Close } from "@material-ui/icons"

interface Props {
  title: string
  onClose: () => void
}
/** A Header for the Dialogs.
 *  Accepts children props to pass additional action buttons.
 */
const DialogHeader: React.FC<Props> = ({ title, onClose, children }) => (
  <AppBar position="relative" component="section">
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="cerrar"
      >
        <Close />
      </IconButton>

      <Typography variant="h6" component="h1" className="dialog-title">
        {title}
      </Typography>

      {children}
    </Toolbar>

    <style global jsx>
      {`
        .dialog-title {
          margin-inline: 1rem;
          flex-grow: 1;
        }
      `}
    </style>
  </AppBar>
)

export default DialogHeader
