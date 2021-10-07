import { FormikHelpers } from "formik"

interface RTKQueryError {
  status: number
  data: {
    fieldErrors: undefined | { [key: string]: string }
  }
}

/** Set the corresponding field errors if there is one. */
const parseFieldErrors = (
  err: RTKQueryError,
  setFieldError: FormikHelpers<any>["setFieldError"]
) => {
  const fieldErrors = err.data.fieldErrors

  if (fieldErrors) {
    Object.keys(fieldErrors).forEach((key) =>
      setFieldError(key, fieldErrors[key])
    )
  }
}

export default parseFieldErrors
