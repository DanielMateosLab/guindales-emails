import DatabaseErrorAlert from "../../common/DatabaseErrorAlert"
import useSearchBarContactsQuery from "../../common/useSearchBarContactsQuery"
import FoundResultsText from "./FoundResultsText"
import SortSettings from "./SortSettings"

const SearchBar: React.FC = () => {
  const { isError, refetch, isLoading } = useSearchBarContactsQuery()

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
