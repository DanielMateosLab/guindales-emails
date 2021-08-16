import { AppBar, Toolbar, Typography } from "@material-ui/core"

const MainBar: React.FC = () => (
  <AppBar position="relative" component="section">
    <Toolbar>
      <Typography variant="h6" component="h1" className="app-bar-title">
        Emails
      </Typography>
    </Toolbar>

    <style jsx>
      {`
        :global(.app-bar-title) {
          flex-grow: 1;
        }
      `}
    </style>
  </AppBar>
)

export default MainBar
