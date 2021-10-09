import { contactResultsDefaultParams as defaultValues } from "utils/config"
import { ContactsQueryParams } from "utils/types"

type ResultQueryParams = Pick<
  Partial<ContactsQueryParams>,
  "filter" | "page"
> & {
  sort: string | undefined
}

const removeDefaultParamsAndStringifySort = ({
  page,
  sort,
  filter,
}: ContactsQueryParams): ResultQueryParams => {
  let resultSort: Partial<ContactsQueryParams["sort"]> | undefined = {}

  let key: keyof typeof sort
  for (key in sort) {
    if (sort[key] !== defaultValues.sort[key]) {
      resultSort = { ...resultSort, [key]: sort[key] }
    }
  }

  if (Object.keys(resultSort).length < 1) {
    resultSort = undefined
  }

  return {
    page: page === defaultValues.page ? undefined : page,
    sort: resultSort && JSON.stringify(resultSort),
    filter: filter === defaultValues.filter ? undefined : filter,
  }
}

export default removeDefaultParamsAndStringifySort
