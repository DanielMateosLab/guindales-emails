import { CircularProgress, Typography } from "@material-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/dist/client/router"

interface Props {
  redirectUnauthenticated?: boolean
  redirectAuthenticated?: boolean
}
const CheckingSession: React.FC<Props> = ({
  redirectUnauthenticated,
  redirectAuthenticated,
}) => {
  const { status } = useSession({ required: false })

  const router = useRouter()

  if (redirectUnauthenticated && status == "unauthenticated") {
    router.push("/")
  }

  if (redirectAuthenticated && status == "authenticated") {
    router.push("/dashboard")
  }

  return (
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
}

export default CheckingSession
