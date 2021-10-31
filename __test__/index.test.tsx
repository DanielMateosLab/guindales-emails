import { screen, waitFor } from "@testing-library/react"
import Home from "../pages"
import { render } from "./utils"

describe("index", () => {
  describe("create contact", () => {
    it("should have an 'add contact' button", async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          contacts: [{ _id: "1", name: "Aaaaa", email: "aaa@aaa.aa" }],
          count: 1,
        })
      )
      render(<Home />)

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Añadir contacto" })
        ).toBeInTheDocument()
      })
    })
  })
})
