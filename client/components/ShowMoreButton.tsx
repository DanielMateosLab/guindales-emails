import { Button } from "@material-ui/core"
import { useAppDispatch } from "../hooks/reduxHooks"
import { updatePage } from "../redux/contactResultsSlice"

interface Props {
  isFetching: boolean
}
const ShowMoreButton: React.FC<Props> = ({ isFetching }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="show-more-button">
      <Button
        disabled={isFetching}
        variant="contained"
        color="primary"
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
