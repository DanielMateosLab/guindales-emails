import { useReducer } from "react"
import { MenuReducerAction, MenuState, SwitchMenu } from "utils/types"

export const initialMenuState = {
  searchMenu: true,
  sortMenu: true,
}

const menuReducer = (
  state: typeof initialMenuState,
  { payload }: MenuReducerAction
) => ({
  ...state,
  [payload]: !state[payload],
})

export const useMenuReducer = (): {
  state: MenuState
  switchMenu: SwitchMenu
} => {
  const [state, dispatch] = useReducer(menuReducer, initialMenuState)

  const switchMenu: SwitchMenu = (menu) =>
    dispatch({ type: "switchMenu", payload: menu })

  return { state, switchMenu }
}
