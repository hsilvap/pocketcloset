import React from 'react'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import { StoreContext } from '../context/store'
import { StoreActions } from '../context/reducer'
import { auth, getCurrentUser } from '../db'

export function LoadUserInfo() {
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

export function LoadBottoms() {
  const { dispatch } = React.useContext(StoreContext)
  const storage = getStorage()

  const loadBottoms = async () => {
    dispatch({ type: StoreActions.LOAD_BOTTOMS })
    const bottoms = []
    const listRef = ref(storage, `${getCurrentUser().uid}/bottoms`)

    const res = await listAll(listRef)
    for (let itemRef of res.items) {
      const fileRef = ref(storage, itemRef.fullPath)
      const url = await getDownloadURL(fileRef)
      bottoms.push({ name: itemRef.name, url, featured: Math.random() < 0.33 })
    }
    dispatch({ type: StoreActions.SET_BOTTOMS, data: bottoms })
  }
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        loadBottoms()
      }
    })
    //eslint-disable-next-line
  }, [dispatch])
}

export function LoadTops() {
  const { dispatch } = React.useContext(StoreContext)
  const storage = getStorage()

  const loadTops = async () => {
    dispatch({ type: StoreActions.LOAD_TOPS })
    const tops = []
    const listRef = ref(storage, `${getCurrentUser().uid}/tops`)

    const res = await listAll(listRef)
    for (let itemRef of res.items) {
      const fileRef = ref(storage, itemRef.fullPath)
      const url = await getDownloadURL(fileRef)
      tops.push({ name: itemRef.name, url, featured: Math.random() < 0.33 })
    }
    dispatch({ type: StoreActions.SET_TOPS, data: tops })
  }
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        loadTops()
      }
    })
    //eslint-disable-next-line
  }, [dispatch])
}
