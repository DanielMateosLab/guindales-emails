import { Typography } from "@material-ui/core"
import ListItem from "client/common/ListItem"
import useIsAuthenticated from "client/common/useIsAuthenticated"
import CheckingSession from "client/features/authentication/CheckingSession"

export default function Home() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated)
    return (
      <main className="app-container">
        <Typography variant="h4" className="home-title">
          Gestiona fácilmente todas tus listas de correo
        </Typography>
        <Typography variant="h5">
          <ul>
            <ListItem> En un solo sitio</ListItem>
            <ListItem> Siempre accesible</ListItem>
            <ListItem> Multiplataforma</ListItem>
          </ul>
        </Typography>

        <style jsx>
          {`
            :global(.home-title) {
              margin: 1rem 0;
            }
          `}
        </style>
      </main>
    )

  return <CheckingSession redirectAuthenticated />
}
