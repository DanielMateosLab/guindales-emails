import { AppBar, Toolbar, Typography } from "@material-ui/core"
import theme from "../theme"
import SecondaryBar from "./SecondaryBar"

const Header: React.FC = () => (
  <header>
    <AppBar position="relative" component="section">
      <Toolbar>
        <Typography variant="h6" component="h1" className="app-bar-title">
          Emails
        </Typography>
      </Toolbar>
    </AppBar>

    <SecondaryBar />

    <style jsx>
      {`          
          header {
            background-color: ${theme.palette.primary.light};
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
          }

          :global(.app-bar-title) {
            flex-grow: 1;
          }
          }
        `}
    </style>
  </header>
)

export default Header
