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
    <article>
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
        {/* TODO: style this and add the text search index to the mongodb atlas cluster */}
        {(formik) => (
          <Form>
            <TextField name="filter" label="Buscar" />
            <IconButton
              type="submit"
              aria-label="Buscar resultados"
              color="secondary"
              size="medium"
            >
              <SearchIcon />
            </IconButton>
          </Form>
        )}
      </Formik>
    </article>
  )
}

export default FilterForm
