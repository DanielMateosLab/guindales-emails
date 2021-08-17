import { useField } from "formik"

interface Props {
  label: string
  name: string
  type?: string
}

const TextField: React.FC<Props> = ({ label, type = "text", ...props }) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} type={type} />
      </label>
      {meta.touched && meta.error ? (
        <p className="error">{meta.error}</p>
      ) : null}
    </>
  )
}

export default TextField
