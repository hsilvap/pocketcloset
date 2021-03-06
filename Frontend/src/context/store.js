import React, { useReducer } from 'react'
import { StoreReducer } from './reducer'

export const initialState = {
  loggedIn: false,
  drawerOpen: false,
  user: {},
  tops: { loading: true, data: [] },
  bottoms: { loading: true, data: [] }
}

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const UseStoreContext = () => React.useContext(StoreContext)
