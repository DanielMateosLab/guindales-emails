import theme from "client/app/theme"
import SearchBar from "client/features/contacts/SearchBar"
import React, { useReducer } from "react"
import MainBar from "./MainBar"

const initialState = {
  search: true,
  sort: true,
}

export type HeaderState = typeof initialState
export type HeaderReducerAction = {
  type: "switchMenu"
  payload: keyof typeof initialState
}
export type HeaderDispatch = React.Dispatch<HeaderReducerAction>

const reducer = (
  state: typeof initialState,
  { payload }: HeaderReducerAction
) => ({
  ...state,
  [payload]: !state[payload],
})

const Header: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <header>
      <MainBar headerState={state} headerDispatch={dispatch} />
      <SearchBar headerState={state} />

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
