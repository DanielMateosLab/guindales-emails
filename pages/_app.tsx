import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { Provider } from "react-redux"
import { store } from "../client/app/store"
import theme from "../client/app/theme"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Los Guindales - Emails</title>
        <meta
          name="description"
          content="Lista de correos de Los Guindales.
            En esta aplicación se guardan y administran contactos para informarles de
            futuros eventos y productos."
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </StylesProvider>
      </ThemeProvider>
    </>
  )
}
export default MyApp
