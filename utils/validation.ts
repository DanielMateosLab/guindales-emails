import * as yup from "yup"
import { validSortFields, validSortOrders } from "./config"

export const getQueryValidation = yup.object().shape({
  sort: yup.object().shape({
    field: isValidField(),
    order: sortOrderIsOneOrMinusOne(),
  }),
  filter: yup.object().shape({
    name: yup.string().max(55),
    email: yup.string().email(),
    phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  }),
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
    .default(-1)
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
