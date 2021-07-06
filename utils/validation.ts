import * as yup from "yup"

export const getContactsQueryParametersValidation = yup.object().shape({
  sort: yup.object().shape({
    _id: sortValueIsOneOrMinusOne(),
    name: sortValueIsOneOrMinusOne(),
  }),
  filter: yup.object().shape({
    name: yup.string().max(55),
    email: yup.string().email(),
    phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  }),
  page: yup.number().positive().integer(),
})

function sortValueIsOneOrMinusOne() {
  return yup
    .number()
    .test(
      "sortTest",
      "Sort value must be 1 for ascending order or -1 for descending order",
      (value) => (valueIsDefined(value) ? value == 1 || value == -1 : true)
    )
}
function valueIsDefined(value: any) {
  return value !== undefined
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
