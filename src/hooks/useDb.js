import React from 'react'
import { collection, query, where, getDocs, doc } from 'firebase/firestore'
import { StoreContext } from '../context/store'
import { StoreActions } from '../context/reducer'
import { auth, getCurrentUser, db } from '../db'

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

export function LoadCloset () {
  const { dispatch } = React.useContext(StoreContext)

  const loadStuff = async () => {
    const bottomsQuerySnapshot = await getDocs(
      collection(db, 'closets', getCurrentUser().uid, 'bottoms')
    )
    bottomsQuerySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data())
    })

    const topsQuerySnapshot = await getDocs(
      collection(db, 'closets', getCurrentUser().uid, 'tops')
    )
    bottomsQuerySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data())
    })
  }
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        loadStuff()
      }
    })
    return () => query
  }, [dispatch])
}

export function LoadTops () {
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
