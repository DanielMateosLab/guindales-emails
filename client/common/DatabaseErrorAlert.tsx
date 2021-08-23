import { IconButton, Typography } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"

const DatabaseErrorAlert: React.FC<{ refetch: Function }> = ({ refetch }) => (
  <Alert
    className="error-alert"
    severity="warning"
    action={
      <IconButton
        color="inherit"
        aria-label="reintentar"
        onClick={() => refetch()}
        size="small"
      >
        <Refresh />
      </IconButton>
    }
  >
    <Typography variant="body2">
      No se ha podido conectar con la base de datos.
    </Typography>
  </Alert>
)

export default DatabaseErrorAlert
