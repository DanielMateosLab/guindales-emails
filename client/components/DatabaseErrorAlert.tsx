import { IconButton, Typography } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"

const DatabaseErrorAlert: React.FC<{ refetch: Function }> = ({ refetch }) => (
  <div className="container">
    <Alert
      severity="warning"
      action={
        <IconButton
          color="inherit"
          aria-label="reintentar"
          onClick={() => refetch()}
        >
          <Refresh />
        </IconButton>
      }
    >
      <Typography variant="body2">
        No se ha podido conectar con la base de datos.
      </Typography>
    </Alert>

    <style jsx>
      {`
        .container {
          margin: 0.5rem 0;
        }
      `}
    </style>
  </div>
)

export default DatabaseErrorAlert
