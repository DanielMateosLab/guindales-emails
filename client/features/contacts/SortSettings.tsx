import theme from "client/app/theme"
import { useAppDispatch } from "client/common/reduxHooks"
import { Field, Form, Formik } from "formik"
import { ContactsSortParams } from "utils/types"
import { updateSort } from "./contactResultsSlice"

const SortSettings: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={
        {
          sortField: "_id",
          sortOrder: -1,
        } as ContactsSortParams
      }
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateSort(values))
        setSubmitting(false)
      }}
    >
      {(formik) => {
        const sortingByName = formik.values.sortField == "name"

        return (
          <Form className="search-settings">
            <h2 className="body-1">Ordenar por</h2>
            <div className="sort-options">
              <Field
                as="select"
                name="sortField"
                aria-label="Propiedad para establecer el orden"
                onChange={(e: Event) => {
                  formik.handleChange(e)
                  formik.submitForm()
                }}
              >
                <option value="_id">Antigüedad</option>
                <option value="name">Nombre</option>
              </Field>

              <Field
                as="select"
                aria-label="Orden ascendente o descendente"
                name="sortOrder"
                onChange={(e: Event) => {
                  formik.handleChange(e)
                  formik.submitForm()
                }}
              >
                <option value={-1}>
                  {sortingByName ? "Z - A" : "Más recientes primero"}
                </option>
                <option value={1}>
                  {sortingByName ? "A - Z" : "Más antiguos primero"}
                </option>
              </Field>
            </div>

            <style jsx global>
              {`
                .sort-options > select:first-child {
                  margin-right: 0.5rem;
                }

                select {
                  box-sizing: border-box;

                  font-family: Roboto;
                  font-size: 0.75rem;
                  font-weight: 400;
                  line-height: normal;

                  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

                  padding: 0.25em;

                  border: 1px solid #aaa;
                  border-radius: 0.25em;

                  background-image: linear-gradient(
                    ${theme.palette.primary.main},
                    ${theme.palette.primary.main}
                  );
                  transition: box-shadow 0.1s ease-in;
                }

                select:active,
                select:focus {
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                  outline: none;
                  border: 1px solid rgba(75, 75, 75, 0.8);
                  font-weight: 500;
                }
              `}
            </style>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SortSettings
