import { ThemeProvider } from "@material-ui/core"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { RouterContext } from "next/dist/next-server/lib/router-context"
import { Provider } from "react-redux"
import { RootState, store } from "../client/redux/store"
import theme from "../client/theme"

/**
 * Re-usable mockPush that is provided to all the tests.
 * Remember that to assert push calls made with Link you need to do it this way:
 * ```
 * expect(mockPush.mock.calls[0]).toContain("/testedRoute")
 * ```
 */
export const mockPush = jest.fn(async () => false)

type CustomRenderOptions = RenderOptions & {
  initialState?: RootState
  pathname?: string
}

/**
 * Custom render function with router, store and material contexts provided.
 * Some useful params can be provided in a config object:
 * @param initialState store initial state
 * @param pathname router pathname
 */
const render = (
  ui: Parameters<typeof rtlRender>[0],
  {
    pathname = "/",
    initialState = store.getState(),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterContext.Provider
          value={
            {
              pathname,
              push: mockPush,
              prefetch: jest.fn(async () => true),
            } as any
          }
        >
          {children}
        </RouterContext.Provider>
      </Provider>
    </ThemeProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
export * from "@testing-library/react"
export { render }
