import { Field, Form, Formik } from "formik"
import useContacts from "../hooks/useContacts"
import theme from "../theme"

const SortSettings: React.FC<{
  dispatch: ReturnType<typeof useContacts>["dispatch"]
  isLoading: boolean
}> = ({ dispatch, isLoading }) => {
  return (
    <article>
      <Formik
        initialValues={{
          field: "_id",
          order: -1,
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({ type: "UPDATE_SORT", payload: values })
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <Form className="sort-menu">
            <h2 className="body-1 sort-title">Ordenar por</h2>
            <div className="sort-options">
              <Field
                as="select"
                name="field"
                disabled={isLoading}
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
                name="order"
                disabled={isLoading}
                onChange={(e: Event) => {
                  formik.handleChange(e)
                  formik.submitForm()
                }}
              >
                <option value={-1}>Más recientes primero</option>
                <option value={1}>Más antiguos primero</option>
              </Field>
            </div>
          </Form>
        )}
      </Formik>

      <style jsx global>
        {`
          .sort-menu {
            margin-bottom: 0.5rem;
          }

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

          @media screen and (min-width: 600px) {
            .sort-menu {
              display: flex;
              align-items: center;
            }
            .sort-title {
              margin-right: 0.5rem;
            }
          }
        `}
      </style>
    </article>
  )
}

export default SortSettings
