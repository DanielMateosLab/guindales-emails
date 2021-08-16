import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useContactResultsSelector } from "./contactResultsSlice"

const FoundResultsText: React.FC<{
  isLoading: boolean
}> = ({ isLoading }) => {
  const { contacts, count } = useContactResultsSelector()

  const [text, setText] = useState("...")

  useEffect(() => {
    if (isLoading) {
      setText("...")
    } else if (contacts.length == 0) {
      setText("No se han encontrado contactos.")
    } else {
      setText(`Mostrando ${contacts.length} de ${count} emails encontrados`)
    }
  }, [contacts.length, count, isLoading])

  return (
    <Typography
      variant="body2"
      style={{ color: isLoading ? "transparent" : "inherit" }}
    >
      {text}
    </Typography>
  )
}

export default FoundResultsText
