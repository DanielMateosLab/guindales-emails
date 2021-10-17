import { Contact, WithoutId } from "utils/types"
import { addContactValidation } from "utils/validation"

describe("contact validation", () => {
  it("should pass with a valid name and email and no phone", () => {
    const contact: WithoutId<Contact> = {
      name: "aaaaa",
      email: "aaaaa@aaa.aa",
      phone: "",
    }

    const isValid = addContactValidation.isValidSync(contact)

    expect(isValid).toBeTruthy()
  })
})
