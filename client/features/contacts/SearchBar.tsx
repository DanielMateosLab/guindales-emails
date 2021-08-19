import { LinearProgress } from "@material-ui/core"
import DatabaseErrorAlert from "client/common/DatabaseErrorAlert"
import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import FilterForm from "./FilterForm"
import FoundResultsText from "./FoundResultsText"
import SortSettings from "./SortSettings"

const SearchBar: React.FC = () => {
  const { isError, refetch, isLoading, isFetching } =
    useSearchBarContactsQuery()

  return (
    <section>
      <FilterForm />
      <SortSettings />

      <FoundResultsText isLoading={isLoading} />

      {isError && <DatabaseErrorAlert refetch={refetch} />}

      {isFetching && <LinearProgress color="secondary" className="progress" />}

      <style jsx>
        {`
          section {
            padding: 1rem;
            position: relative;
          }

          :global(.progress) {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }
        `}
      </style>
    </section>
  )
}

export default SearchBar
