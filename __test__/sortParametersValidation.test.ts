import { validSortFields, validSortValues } from "../utils/config"
import { getQueryValidation } from "../utils/validation"

describe("Sort parameters validation", () => {
  it("should pass with valid sort paramters", () => {
    expect.assertions(validSortValues.length * validSortFields.length)

    try {
      validSortFields.forEach((field) =>
        validSortValues.forEach((value) => {
          const result = getQueryValidation.validateSync({
            sort: { field, value },
          })
          expect(result).toBeDefined()
        })
      )
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })

  it("should fail with an invalid field", () => {
    try {
      const result = getQueryValidation.validateSync({
        field: "aaaa",
        value: 1,
      })
      expect(result).toBeUndefined()
    } catch (e) {
      expect(e.name).toEqual("ValidationError")
    }
  })

  it("should fail with an invalid value", () => {
    try {
      const result = getQueryValidation.validateSync({
        field: "name",
        value: 3,
      })
      expect(result).toBeUndefined()
    } catch (e) {
      expect(e.name).toEqual("ValidationError")
    }
  })
})
