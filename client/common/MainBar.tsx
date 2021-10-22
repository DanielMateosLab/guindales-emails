import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { FileCopy, Search, Sort } from "@material-ui/icons"
import { MenuState, SwitchMenu } from "utils/types"

interface Props {
  menuState: MenuState
  switchMenu: SwitchMenu
}
const MainBar: React.FC<Props> = ({ menuState, switchMenu }) => (
  <AppBar position="relative" component="section">
    <Toolbar>
      <Typography variant="h6" component="h1" className="app-bar-title">
        Emails
      </Typography>
      <section className="menu-buttons">
        <IconButton
          className={menuState.searchMenu ? "active" : ""}
          onClick={() => switchMenu("searchMenu")}
          aria-label="Mostrar/ocultar menú de búsqueda"
        >
          <Search />
        </IconButton>
        <IconButton
          className={menuState.sortMenu ? "active" : ""}
          onClick={() => switchMenu("sortMenu")}
          aria-label="Mostrar/ocultar menú de orden de resultados"
        >
          <Sort />
        </IconButton>
        <IconButton aria-label="Obtener todos los emails">
          <FileCopy />
        </IconButton>
      </section>
    </Toolbar>

    <style global jsx>
      {`
        .menu-buttons > button {
          margin-right: 0.5rem;
          padding: 8px;
        }
        .menu-buttons > button:last-child {
          margin-right: 0;
        }

        .app-bar-title {
          flex-grow: 1;
        }
        .active {
          background-color: rgba(0, 0, 0, 0.15) !important;
        }
      `}
    </style>
  </AppBar>
)

export default MainBar
