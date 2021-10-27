import { Typography } from "@material-ui/core"
import useIsAuthenticated from "client/common/useIsAuthenticated"
import CheckingSession from "client/features/authentication/CheckingSession"

export default function Home() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated)
    return (
      <div className="app-container">
        <Typography variant="h4">
          Gestiona fácilmente todas tus listas de correo
        </Typography>
        <Typography variant="h5">
          <ul>
            <li> En un solo sitio</li>
            <li> Siempre accesible</li>
            <li> Multiplataforma</li>
          </ul>
        </Typography>

        <style jsx>
          {`
            li {
              list-style-type: none;
              padding-left: 1rem;
              margin: 1rem 0;
            }
          `}
        </style>
      </div>
    )

  return <CheckingSession redirectAuthenticated />
}
