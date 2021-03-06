import * as yup from "yup"
import { validSortFields, validSortOrders } from "./config"
import { ContactsSortParams } from "./types"

const requiredErrorText = "Campo obligatorio"

const name = yup.string().max(55, "Debe tener menos de 55 caracteres")
const email = yup
  .string()
  .email("El correo electrónico proporcionado no es válido")
const phone = yup
  .string()
  .transform(removeWhitespaces)
  .test("phoneNumber", "El teléfono no es válido", (value) => {
    const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

    if (value == undefined || value == "" || pattern.test(value)) return true

    return false
  })

export const addContactValidation = yup.object().shape({
  name: name.required(requiredErrorText),
  email: email.required(requiredErrorText),
  phone,
})

export const updateContactValidation = yup
  .object()
  .shape({ email, name, phone })

export const filterValidation = yup
  .string()
  .max(100, "El máximo de caracteres permitidos es 100")

export const getQueryParamsValidation = yup.object({
  filter: filterValidation,
  page: yup.number().positive().integer(),
  sortField: isValidField(),
  sortOrder: sortOrderIsOneOrMinusOne(),
})

function isValidField() {
  return yup
    .mixed<ContactsSortParams["sortField"]>()
    .default("_id")
    .test(
      "allowedFields",
      "Sort field must be _id or name",
      (field) => field !== undefined && validSortFields.includes(field as any)
    )
}
function sortOrderIsOneOrMinusOne() {
  return yup
    .mixed<ContactsSortParams["sortOrder"]>()
    .default(-1)
    .transform((value) => Number(value))
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

function setUndefinedIfEmptyString(value: any) {
  if (value === "") {
    return undefined
  }
  return value
}
