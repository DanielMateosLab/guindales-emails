import "@testing-library/jest-dom/extend-expect"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { SuccessContactsResponse } from "./utils/types"

require("dotenv").config({ path: ".env.local" })

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

// Msw setup
const server = setupServer(
  rest.get("/api/contacts", (req, res, ctx) => {
    const result: SuccessContactsResponse = {
      contacts: [{ _id: "1", name: "Aaaaa", email: "aaa@aaa.aa" }],
      count: 1,
    }
    return res(ctx.status(200), ctx.json(result))
  })
)

// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())
