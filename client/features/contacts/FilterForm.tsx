import { IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useAppDispatch } from "client/common/reduxHooks"
import TextField from "client/common/TextField"
import { Form, Formik } from "formik"
import { filterValidation } from "utils/validation"
import { updateFilter } from "./contactResultsSlice"

const FilterForm: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{
        filter: "",
      }}
      validationSchema={filterValidation}
      onSubmit={({ filter }, { setSubmitting }) => {
        dispatch(updateFilter(filter))
        setSubmitting(false)
      }}
    >
      <Form>
        <TextField name="filter" label="Buscar" className="search-settings">
          <IconButton
            type="submit"
            aria-label="Buscar resultados"
            color="secondary"
            size="small"
            className="search-button"
          >
            <SearchIcon />
          </IconButton>
        </TextField>
        <style jsx>
          {`
            :global(.search-button) {
              position: absolute;
              right: 0.25rem;
              bottom: 0;
            }
          `}
        </style>
      </Form>
    </Formik>
  )
}

export default FilterForm
