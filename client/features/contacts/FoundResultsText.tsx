import { Button, Typography } from "@material-ui/core"
import theme from "client/app/theme"
import { useEffect, useState } from "react"
import { useContactResultsSelector } from "./contactResultsSlice"

const FoundResultsText: React.FC<{
  isLoading: boolean
}> = ({ isLoading }) => {
  const { contacts, count } = useContactResultsSelector()

  const [text, setText] = useState("")

  useEffect(() => {
    if (contacts.length == 0) {
      setText("No se han encontrado contactos.")
    } else {
      setText(`Mostrando ${contacts.length} de ${count} resultados. `)
    }
  }, [contacts.length, count, isLoading])

  return (
    <article className="found-results">
      {!isLoading && (
        <Typography variant="body2">
          {text}
          <Button size="small" className="see-all-button">
            Ver todos
          </Button>
        </Typography>
      )}

      <style global jsx>
        {`
          .found-results {
            min-height: 1.875rem;
          }
          .see-all-button {
            color: ${theme.palette.secondary.dark};
          }
        `}
      </style>
    </article>
  )
}

export default FoundResultsText
