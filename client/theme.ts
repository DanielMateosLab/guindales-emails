import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// Color tool: https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=65FC86

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#65fc86",
      light: "#9effb7",
      dark: "#1bc857",
      contrastText: "#000000",
    },
    secondary: {
      main: "#327d42",
      light: "#62ad6e",
      dark: "#005019",
      contrastText: "#ffffff",
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
