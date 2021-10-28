import { useMediaQuery } from "@material-ui/core"
import theme from "client/app/theme"

export default function useIsSmallScreen() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return isSmallScreen
}
