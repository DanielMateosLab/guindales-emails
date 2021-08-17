import { getQueryValidation } from "utils/validation"

describe("filter validation", () => {
  test("it should remove the whitespaces of the phone number when validating", () => {
    const result = getQueryValidation.validateSync({
      filter: { phone: "123 456 789" },
    })

    expect(result.filter.phone).toEqual("123456789")
  })
})
