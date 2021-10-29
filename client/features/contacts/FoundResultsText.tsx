import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import AllContactsDialog from "./AllContactsDialog"
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
          <AllContactsDialog />
        </Typography>
      )}

      <style global jsx>
        {`
          .found-results {
            display: flex;
            align-items: center;
            min-height: 1.875rem;
          }
        `}
      </style>
    </article>
  )
}

export default FoundResultsText
