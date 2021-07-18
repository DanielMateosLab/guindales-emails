import "@testing-library/jest-dom/extend-expect"

require("dotenv").config({ path: ".env.local" })

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})
