import * as yup from "yup"
import { validSortFields, validSortOrders } from "./config"

const requiredErrorText = "Campo obligatorio"

export const contactValidation = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorText)
    .max(55, "Debe tener menos de 55 caracteres"),
  email: yup
    .string()
    .required(requiredErrorText)
    .email("El correo electrónico proporcionado no es válido"),
  phone: yup
    .string()
    .transform(removeWhitespaces)
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "El número de teléfono proporcionado no es válido"
    ),
})

export const filterValidation = yup
  .string()
  .max(100, "El máximo de caracteres permitidos es 100")

export const getQueryValidation = yup.object().shape({
  sort: yup.object().shape({
    field: isValidField(),
    order: sortOrderIsOneOrMinusOne(),
  }),
  filter: filterValidation,
  page: yup.number().positive().integer(),
})

function isValidField() {
  return yup
    .string()
    .default("_id")
    .test(
      "allowedFields",
      "Sort field must be _id or name",
      (field) => field !== undefined && validSortFields.includes(field as any)
    )
}
function sortOrderIsOneOrMinusOne() {
  return yup
    .number()
    .default(1)
    .test(
      "sortTest",
      "Sort order must be 1 for ascending order or -1 for descending order.",
      (order) => order !== undefined && validSortOrders.includes(order)
    )
}

interface Object {
  [key: string]: any
}
/** Returns a new object without the properties with undefined value. */
export function removeUndefinedProperties(object: Object): Object {
  const parsedObject: Object = {}

  for (const prop in object) {
    if (object[prop] !== undefined) {
      parsedObject[prop] = object[prop]
    }
  }

  return parsedObject
}

function removeWhitespaces(value: string) {
  return value.replace(/ /g, "")
}
