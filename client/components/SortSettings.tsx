import { Field, Form, Formik } from "formik"

const SortSettings: React.FC = () => {
  return (
    <article>
      <Formik
        initialValues={{
          field: "_id",
          order: -1,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values)), setSubmitting(false)
        }}
      >
        {(formik) => (
          <Form className="sort-menu">
            <h2 className="body-1 sort-title">Ordenar por</h2>
            <div className="sort-options">
              <Field
                as="select"
                name="field"
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
                onChange={(e: Event) => {
                  formik.handleChange(e)
                  formik.submitForm()
                }}
              >
                <option value="1">Más recientes primero</option>
                <option value="-1">Más antiguos primero</option>
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
