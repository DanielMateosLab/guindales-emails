import { Contact, WithoutId } from "utils/types"
import { contactValidation } from "utils/validation"

describe("contact validation", () => {
  it("should pass with a valid name and email and no phone", () => {
    const contact: WithoutId<Contact> = {
      name: "aaaaa",
      email: "aaaaa@aaa.aa",
      phone: "",
    }

    const isValid = contactValidation.isValidSync(contact)

    expect(isValid).toBeTruthy()
  })
})
