import { LinearProgress } from "@material-ui/core"
import DatabaseErrorAlert from "client/common/DatabaseErrorAlert"
import { HeaderState } from "client/common/Header"
import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import FilterForm from "./FilterForm"
import FoundResultsText from "./FoundResultsText"
import SortSettings from "./SortSettings"

const SearchBar: React.FC<{ headerState: HeaderState }> = ({ headerState }) => {
  const { isError, refetch, isLoading, isFetching } =
    useSearchBarContactsQuery()

  return (
    <section>
      {headerState.search && <FilterForm />}
      {headerState.sort && <SortSettings />}

      {isError ? (
        <DatabaseErrorAlert refetch={refetch} />
      ) : (
        <FoundResultsText isLoading={isLoading || isFetching} />
      )}

      {(isLoading || isFetching) && (
        <LinearProgress color="secondary" className="progress" />
      )}

      <style jsx>
        {`
          section {
            padding: 1rem;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          :global(.progress) {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }

          @media screen and (min-width: 600px) {
            section {
              padding: 1rem 2rem;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-areas:
                "a b"
                "c c";
            }

            :global(.found-results) {
              grid-area: c;
            }

            :global(.error-alert) {
              grid-area: c;
            }
          }

          @media screen and (min-width: 960px) {
            section {
              display: flex;
              flex-direction: row;
              align-items: center;
              column-gap: 2rem;
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
