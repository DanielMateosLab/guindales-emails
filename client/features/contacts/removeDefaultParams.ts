import { contactResultsDefaultParams as defaultParams } from "utils/config"
import { ContactsParams } from "utils/types"

const removeDefaultParams = (
  params: Partial<ContactsParams>
): Partial<ContactsParams> => {
  let param: keyof typeof params
  let newParams = { ...params }

  for (param in params) {
    if (params[param] == defaultParams[param]) {
      delete newParams[param]
    }
  }

  return newParams
}

export default removeDefaultParams
