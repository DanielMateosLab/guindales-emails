import theme from "client/app/theme"
import SearchBar from "client/features/contacts/SearchBar"
import React from "react"
import MainBar from "./MainBar"
import { useMenuReducer } from "./menuReducer"
import useIsAuthenticated from "./useIsAuthenticated"

const Header: React.FC = () => {
  const { state, switchMenu } = useMenuReducer()

  const isAuthenticated = useIsAuthenticated()

  return (
    <header>
      <MainBar {...{ menuState: state, switchMenu }} />
      {isAuthenticated && <SearchBar menuState={state} />}

      <style jsx>
        {`
          header {
            background-color: ${theme.palette.primary.light};
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1;
          }
        `}
      </style>
    </header>
  )
}

export default Header
