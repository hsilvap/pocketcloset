import { initialState } from './store'

export const StoreActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOAD_TOPS: 'LOAD_TOPS',
  OPEN_DRAWER: 'OPEN_DRAWER',
  CLOSE_DRAWER: 'CLOSE_DRAWER',
  SET_TOPS: 'SET_TOPS',
  DELETE_TOP: 'DELETE_TOP',
  LOAD_BOTTOMS: 'LOAD_BOTTOMS',
  SET_BOTTOMS: 'SET_BOTTOMS',
  DELETE_BOTTOM: 'DELETE_BOTTOM'
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
    case StoreActions.LOAD_TOPS: {
      return { ...state, bottoms: { ...state.tops, loading: true } }
    }
    case StoreActions.SET_TOPS: {
      const { data } = action
      return { ...state, tops: { loading: false, data: data } }
    }
    case StoreActions.DELETE_TOP: {
      const { data } = action
      const tops = [...state.tops.data]
      const filteredTops = tops.filter(t => t.url !== data.url)
      return { ...state, tops: { loading: false, data: filteredTops } }
    }
    case StoreActions.LOAD_BOTTOMS: {
      return { ...state, bottoms: { ...state.bottoms, loading: true } }
    }
    case StoreActions.SET_BOTTOMS: {
      const { data } = action
      return { ...state, bottoms: { loading: false, data: data } }
    }
    case StoreActions.DELETE_BOTTOM: {
      const { data } = action
      const bottoms = [...state.bottoms.data]
      const filteredTops = bottoms.filter(t => t.url !== data.url)
      return { ...state, bottoms: { loading: false, data: filteredTops } }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
