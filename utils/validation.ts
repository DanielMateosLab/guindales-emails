import * as yup from "yup"
import { Contact } from "./types"

const allowedSortFields: Array<keyof Contact> = ["_id", "name"]
const sortFieldErrorText = `Invalid sort property.\
  Allowed sort fields: ${allowedSortFields.join(", ")}.\
  Sort value must be 1 for ascending order or -1 for descending order.\
  Example: { _id: 1, name: -1}.`

export const getContactsQueryParametersValidation = yup.object().shape({
  sort: yup.object().test("sortTest", sortFieldErrorText, (sortParams) => {
    if (sortParams == null) {
      return true
    }

    if (typeof sortParams == "object") {
      let isValid = true

      Object.keys(sortParams).forEach((key) => {
        if (keyIsValid(key) && sortValueIsValid(sortParams[key])) {
          return
        } else {
          isValid = false
        }
      })

      return isValid
    }

    return false
  }),
  filter: yup.object().shape({
    name: yup.string().max(55),
    email: yup.string().email(),
    phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  }),
  page: yup.number().positive().integer(),
})

function keyIsValid(key: string) {
  return allowedSortFields.some((value) => value == key)
}
function sortValueIsValid(value: any) {
  return value == 1 || value == -1
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
