import { AppBar, Toolbar, Typography } from "@material-ui/core"
import theme from "../theme"
import DatabaseErrorAlert from "./DatabaseErrorAlert"
import FoundResultsText from "./FoundResultsText"
import SortSettings from "./SortSettings"

interface Props {
  isLoading: boolean
  isError: boolean
  refetch: Function
}
const Header: React.FC<Props> = ({ isError, isLoading, refetch }) => (
  <header>
    <AppBar position="relative" component="section">
      <Toolbar>
        <Typography variant="h6" component="h1" className="app-bar-title">
          Emails
        </Typography>
      </Toolbar>
    </AppBar>

    <section className="secondary-bar">
      <SortSettings />

      <FoundResultsText isLoading={isLoading} />

      {isError && <DatabaseErrorAlert refetch={refetch} />}
    </section>

    <style jsx>
      {`
          .secondary-bar {
            padding: 1rem;
          }
          
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
