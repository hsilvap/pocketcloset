import React from 'react'
import { GoogleAuthProvider } from 'firebase/auth'

import db from '../../db'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Avatar, Button, Icon } from '@material-ui/core'
import { StoreContext } from '../../context/store'

const TopBar = () => {
  const { state, dispatch } = React.useContext(StoreContext)

  const signIn = React.useCallback(() => {
    var provider = new GoogleAuthProvider()
    db.auth().signInWithPopup(provider)
  }, [])
  const signOut = React.useCallback(() => {
    db.auth().signOut()
  }, [])

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' color='inherit' noWrap>
          Pocket Closet
        </Typography>
        <div id='user-container'>
          {!!state.loggedIn ? (
            <>
              <div>
                <Avatar
                  alt={state.user.userName}
                  src={state.user.profilePicUrl}
                />
                &nbsp;
                <span id='user-name' style={{ fontWeight: 500 }}>
                  {state.user.userName}&nbsp;
                </span>
              </div>

              <Button onClick={signOut}>Sign-out</Button>
            </>
          ) : (
            <Button onClick={() => signIn()}>
              <Icon>fingerprint</Icon> &nbsp; Sign-in with Google
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
