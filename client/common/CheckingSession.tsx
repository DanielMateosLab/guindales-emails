import { CircularProgress, Typography } from "@material-ui/core"

const CheckingSession: React.FC = () => (
  <div className="app-container container">
    <Typography>
      Un momento, estamos comprobando si has iniciado sesión.
    </Typography>
    <CircularProgress color="secondary" />

    <style jsx>
      {`
        .container {
          gap: 1rem;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      `}
    </style>
  </div>
)

export default CheckingSession
