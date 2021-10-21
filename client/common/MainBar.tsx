import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { FileCopy, Search, SortByAlpha } from "@material-ui/icons"
import { HeaderDispatch, HeaderState } from "./Header"

interface Props {
  headerState: HeaderState
  headerDispatch: HeaderDispatch
}
const MainBar: React.FC<Props> = ({ headerState, headerDispatch }) => (
  <AppBar position="relative" component="section">
    <Toolbar>
      <Typography variant="h6" component="h1" className="app-bar-title">
        Emails
      </Typography>
      <section>
        <IconButton
          className={headerState.search ? "active" : ""}
          onClick={() =>
            headerDispatch({ type: "switchMenu", payload: "search" })
          }
          aria-label="Mostrar/ocultar menú de búsqueda"
        >
          <Search />
        </IconButton>
        <IconButton
          className={headerState.sort ? "active" : ""}
          onClick={() =>
            headerDispatch({ type: "switchMenu", payload: "sort" })
          }
          aria-label="Mostrar/ocultar menú de orden de resultados"
        >
          <SortByAlpha />
        </IconButton>
        <IconButton aria-label="Obtener todos los emails">
          <FileCopy />
        </IconButton>
      </section>
    </Toolbar>

    <style global jsx>
      {`
        .app-bar-title {
          flex-grow: 1;
        }
        .active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}
    </style>
  </AppBar>
)

export default MainBar
