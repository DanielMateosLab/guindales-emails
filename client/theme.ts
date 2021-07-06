import { blue, orange, red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[400],
      light: "#9be7ff",
      dark: "#2286c3",
      contrastText: "#000000",
    },
    secondary: {
      main: orange[400],
      light: "#ffe97d",
      dark: "#c88719",
      contrastText: "#000000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
