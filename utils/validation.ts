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
  page: yup.number().positive().integer(),
})

function keyIsValid(key: string) {
  return allowedSortFields.some((value) => value == key)
}
function sortValueIsValid(value: any) {
  return value == 1 || value == -1
}
