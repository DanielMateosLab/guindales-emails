import theme from "client/app/theme"
import { useField } from "formik"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface Props {
  label: string
  name: string
  type?: string
}
type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
const TextField: React.FC<Props & InputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <div className="root">
      <label htmlFor={props.name}>{label}</label>
      <input id={props.name} {...field} {...props} type={type} />
      {meta.touched && meta.error ? (
        <p className="error">{meta.error}</p>
      ) : null}

      {/* TODO: put the search button inside the input, style for big screens */}
      <style jsx>{`
        .root {
          padding: 0.25rem 0;
        }
        label {
          display: block;
          margin-bottom: 0.25rem;
        }
        input {
          width: 100%;
          font-family: Roboto;
          font-size: 1rem;
          padding: 0.25rem;
          outline-color: ${theme.palette.secondary.main};
        }
      `}</style>
    </div>
  )
}

export default TextField
