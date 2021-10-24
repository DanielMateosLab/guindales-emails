import { Button, Typography } from "@material-ui/core"
import theme from "client/app/theme"
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
      setText(`Mostrando ${contacts.length} de ${count} resultados. `)
    }
  }, [contacts.length, count, isLoading])

  return (
    <article className="found-results">
      <Typography
        variant="body2"
        style={{ color: isLoading ? "transparent" : "inherit" }}
      >
        {text}
        {!isLoading && (
          <Button size="small" className="see-all-button">
            Ver todos
          </Button>
        )}
      </Typography>

      <style global jsx>
        {`
          .see-all-button {
            color: ${theme.palette.secondary.dark};
          }
        `}
      </style>
    </article>
  )
}

export default FoundResultsText
