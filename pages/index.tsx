import { Button, Typography } from "@material-ui/core"
import ListItem from "client/common/ListItem"
import useIsAuthenticated from "client/common/useIsAuthenticated"
import CheckingSession from "client/features/authentication/CheckingSession"
import { signIn } from "next-auth/react"

export default function Home() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated)
    return (
      <main className="app-container">
        <Typography variant="h4" className="home-title">
          Gestiona fácilmente todas tus listas de correo
        </Typography>

        <Typography variant="h5" className="features">
          <ListItem>En un solo sitio</ListItem>
          <ListItem>Siempre accesible</ListItem>
          <ListItem>Multiplataforma</ListItem>
        </Typography>

        <Button
          className="login-button"
          color="primary"
          variant="contained"
          onClick={() => signIn()}
        >
          Acceder
        </Button>

        <style jsx>
          {`
            main {
              text-align: center;
            }
          `}
        </style>
        <style global jsx>
          {`
            .home-title {
              margin: 1rem 0;
            }
            .features {
              max-width: max-content;
              margin: 2rem auto;
            }
          `}
        </style>
      </main>
    )

  return <CheckingSession redirectAuthenticated />
}
