import * as yup from "yup"

export const getContactsQueryParametersValidation = yup.object().shape({
  page: yup.number().positive().integer(),
})
