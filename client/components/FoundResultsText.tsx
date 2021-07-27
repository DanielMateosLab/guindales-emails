import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useAppSelector } from "../hooks/reduxHooks"

const FoundResultsText: React.FC<{
  isUninitialized: boolean
}> = ({ isUninitialized }) => {
  const { contacts, count } = useAppSelector((state) => state.contactResults)

  const [text, setText] = useState("_")

  useEffect(() => {
    if (isUninitialized) {
      setText("_")
    } else if (contacts.length == 0) {
      setText("No se han encontrado contactos.")
    } else {
      setText(`Mostrando ${contacts.length} de ${count} emails encontrados`)
    }
  }, [contacts.length, count])

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
