import { Avatar, Box, Tooltip } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { StoreContext } from '../../context/store'
import { AiOutlineLogin, AiOutlineMenu } from 'react-icons/ai'
import { auth } from './../../db'

const TopBar = () => {
  const { state, dispatch } = React.useContext(StoreContext)
  const signIn = React.useCallback(() => {
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }, [])
  const logOut = React.useCallback(() => {
    signOut(auth)
    setAnchorEl(null)
  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <AiOutlineMenu />
          </IconButton>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            PocketCloset
          </Typography>
          {!!state.loggedIn ? (
            <div>
              <Tooltip title='Open settings'>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <Avatar
                    alt={state.user.userName}
                    src={state.user.profilePicUrl}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Tooltip title='Login'>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={signIn}
                color='inherit'
              >
                <AiOutlineLogin />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
