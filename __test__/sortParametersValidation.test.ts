import { validSortFields, validSortOrders } from "../utils/config"
import { getQueryParamsValidation } from "../utils/validation"

describe("Sort parameters validation", () => {
  it("should pass with valid sort paramters", () => {
    expect.assertions(validSortOrders.length * validSortFields.length)

    try {
      validSortFields.forEach((field) =>
        validSortOrders.forEach((order) => {
          const result = getQueryParamsValidation.validateSync({
            sort: { field, order },
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
      const result = getQueryParamsValidation.validateSync({
        sort: {
          field: "aaaa",
          order: 1,
        },
      })
      expect(result).toBeDefined()
    } catch (e: any) {
      expect(e.name).toEqual("ValidationError")
    }
  })

  it("should fail with an invalid order", () => {
    try {
      const result = getQueryParamsValidation.validateSync({
        sort: {
          field: "name",
          order: 3,
        },
      })
      expect(result).toBeDefined()
    } catch (e: any) {
      expect(e.name).toEqual("ValidationError")
    }
  })
})
