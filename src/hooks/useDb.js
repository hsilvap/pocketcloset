import React from 'react'
import { collection, query } from 'firebase/firestore'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
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

export function LoadBottoms () {
  const { dispatch } = React.useContext(StoreContext)
  const storage = getStorage()

  const loadBottoms = async () => {
    const listRef = ref(storage, `${getCurrentUser().uid}/bottoms`)
    // Find all the prefixes and items.
    listAll(listRef)
      .then(res => {
        res.prefixes.forEach(folderRef => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        })
        res.items.forEach(itemRef => {
          console.log(itemRef.fullPath)
          const fileRef = ref(storage, itemRef.fullPath)

          // Get the download URL
          getDownloadURL(fileRef).then(url => {
            console.log(url)
            // Insert url into an <img> tag to "download"
          })
          // All the items under listRef.
        })
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      })
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

export function LoadTops () {
  const { dispatch } = React.useContext(StoreContext)
  const storage = getStorage()

  const loadTops = async () => {
    const tops = []
    const listRef = ref(storage, `${getCurrentUser().uid}/tops`)

    const res = await listAll(listRef)
    for (let itemRef of res.items) {
      const fileRef = ref(storage, itemRef.fullPath)
      const url = await getDownloadURL(fileRef)
      tops.push({ name: itemRef.name, url })
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
