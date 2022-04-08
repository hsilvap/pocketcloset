import React from 'react'

import { StoreContext } from '../context/store'
import { StoreActions } from '../context/reducer'
import { auth, getCurrentUser } from '../db'

export function LoadUserInfo () {
  const { dispatch } = React.useContext(StoreContext)

  React.useEffect(() => {
    let query
    auth.onAuthStateChanged(user => {
      if (user) {
        const profilePicUrl =
          getCurrentUser().photoURL || '/images/profile_placeholder.png'
        const userName = getCurrentUser().displayName
        const uid = getCurrentUser().uid

        dispatch({
          type: StoreActions.LOGIN,
          data: {
            loggedIn: true,
            user: { profilePicUrl, userName, uid }
          }
        })
      } else {
        dispatch({ type: StoreActions.LOGOUT })
      }
    })
    return () => query
  }, [dispatch])
}
