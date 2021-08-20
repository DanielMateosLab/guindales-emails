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

      {true && <DatabaseErrorAlert refetch={refetch} />}

      {isFetching && <LinearProgress color="secondary" className="progress" />}

      <style jsx>
        {`
          section {
            padding: 1rem;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          :global(.progress) {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }

          // TODO: split the content in two rows for medium screens. Maybe use grid instead of flex
          // See material design breakpoints

          @media screen and (min-width: 800px) {
            section {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            :global(.search-settings) {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
          }
        `}
      </style>
    </section>
  )
}

export default SearchBar
