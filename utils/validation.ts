import * as yup from "yup"
import { validSortFields, validSortValues } from "./config"

export const getQueryValidation = yup.object().shape({
  sort: yup.object().shape({
    field: isValidField(),
    value: sortValueIsOneOrMinusOne(),
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
    .test(
      "allowedFields",
      "Sort field must be _id or name",
      (field) => field !== undefined && validSortFields.includes(field as any)
    )
}
function sortValueIsOneOrMinusOne() {
  return yup.number().test(
    "sortTest",
    (context) =>
      "Sort value must be 1 for ascending order or -1 for descending order. Given value: " +
      JSON.stringify(context),
    (value) => value !== undefined && validSortValues.includes(value)
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
