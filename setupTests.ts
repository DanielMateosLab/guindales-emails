import "@testing-library/jest-dom/extend-expect"
import { enableFetchMocks } from "jest-fetch-mock"

require("dotenv").config({ path: ".env.local" })

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

enableFetchMocks()
