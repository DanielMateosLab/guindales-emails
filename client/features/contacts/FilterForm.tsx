import { Button } from "@material-ui/core"
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
        {(formik) => (
          <Form>
            <TextField name="filter" label="Buscar" />

            <Button type="submit"> Buscar</Button>
          </Form>
        )}
      </Formik>
    </article>
  )
}

export default FilterForm
