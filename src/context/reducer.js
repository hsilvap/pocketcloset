import { initialState } from './store'

export const StoreActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER'
}

export function StoreReducer (state, action) {
  switch (action.type) {
    case StoreActions.LOGIN: {
      const { data } = action
      return { ...state, ...data }
    }
    case StoreActions.LOGOUT: {
      return initialState
    }
    case StoreActions.OPEN_DRAWER:
      return { ...state, drawerOpen: true }
    case StoreActions.CLOSE_DRAWER:
      return { ...state, drawerOpen: false }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
