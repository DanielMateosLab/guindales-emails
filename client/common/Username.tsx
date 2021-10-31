import { Typography } from "@material-ui/core"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useIsSmallScreen from "./useIsSmallScreen"

/** Display the user name or email.
 * If the screen is small, strings larger than 8 characters will get trimmed down */
export default function Username() {
  const { data } = useSession({ required: false })

  const [username, setUsername] = useState("")
  const isSmallScreen = useIsSmallScreen()

  useEffect(() => {
    let newUsername = data?.user?.name || data?.user?.email || ""

    if (isSmallScreen && newUsername.length > 8) {
      newUsername = newUsername.slice(0, 8).concat("...")
    }

    setUsername(newUsername)
  }, [data?.user, isSmallScreen])

  return (
    <Typography className="app-bar-title" align="center">
      {username}
    </Typography>
  )
}
