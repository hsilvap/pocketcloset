import { initialState } from './store'

export const StoreActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
