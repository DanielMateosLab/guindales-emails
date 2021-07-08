import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"

const FoundResultsText: React.FC<{
  contactsLength: number
  count: number | undefined
}> = ({ contactsLength, count }) => {
  const [text, setText] = useState("_")

  useEffect(() => {
    if (count == undefined) {
      setText("_")
    } else if (contactsLength == 0) {
      setText("No se han encontrado contactos.")
    } else {
      setText(`Mostrando ${contactsLength} de ${count} emails encontrados`)
    }
  }, [contactsLength, count])

  return (
    <Typography
      variant="body2"
      style={{ color: count == undefined ? "transparent" : "inherit" }}
    >
      {text}
    </Typography>
  )
}

export default FoundResultsText
