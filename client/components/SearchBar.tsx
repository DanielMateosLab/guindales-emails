import { useAppSelector } from "../hooks/reduxHooks"
import { useGetContactsQuery } from "../redux/apiSlice"
import DatabaseErrorAlert from "./DatabaseErrorAlert"
import FoundResultsText from "./FoundResultsText"
import SortSettings from "./SortSettings"

const SearchBar: React.FC = () => {
  const { page, sort } = useAppSelector((state) => state.contactResults)

  const { isError, refetch, isLoading } = useGetContactsQuery({
    page,
    sort,
  })

  return (
    <section>
      <SortSettings />

      <FoundResultsText isLoading={isLoading} />

      {isError && <DatabaseErrorAlert refetch={refetch} />}

      <style jsx>
        {`
          section {
            padding: 1rem;
          }
        `}
      </style>
    </section>
  )
}

export default SearchBar
