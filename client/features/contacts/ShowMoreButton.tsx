import { Button } from "@material-ui/core"
import { useAppDispatch } from "client/common/reduxHooks"
import useSearchBarContactsQuery from "client/common/useSearchBarContactsQuery"
import { updatePage } from "client/features/contacts/contactResultsSlice"

const ShowMoreButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isFetching } = useSearchBarContactsQuery()

  return (
    <div className="show-more-button">
      <Button
        disabled={isFetching}
        variant="outlined"
        onClick={() => {
          dispatch(updatePage())
        }}
      >
        Mostrar más
      </Button>

      <style jsx>
        {`
          .show-more-button {
            margin: 1rem 0;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  )
}

export default ShowMoreButton
