import React from 'react'

import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { UseStoreContext } from '../../context/store'
import { StoreActions } from '../../context/reducer'
import {
  AiOutlineInstagram,
  AiOutlineSkin,
  AiOutlineTag,
  AiOutlineWallet,
  AiOutlineCloudUpload
} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants'

const ACTIONS = [
  {
    text: 'My closet',
    destination: ROUTES.MY_CLOSET,
    icon: <AiOutlineInstagram />
  },
  { text: 'My tops', destination: ROUTES.TOPS, icon: <AiOutlineSkin /> },
  { text: 'My bottoms', destination: ROUTES.BOTTOMS, icon: <AiOutlineTag /> }
]
const SECONDARY_ACTIONS = [
  {
    text: 'Upload clothes',
    destination: ROUTES.UPLOAD,
    icon: <AiOutlineCloudUpload />
  },
  {
    text: 'Check if I already have something similar',
    destination: ROUTES.COMPARE,
    icon: <AiOutlineWallet />
  }
]
const Drawer = React.memo(() => {
  const navigate = useNavigate()

  const { state, dispatch } = UseStoreContext()
  const handleOpenDrawer = React.useCallback(() => {
    dispatch({ type: StoreActions.OPEN_DRAWER })
  }, [dispatch])

  const handleCloseDrawer = React.useCallback(() => {
    dispatch({ type: StoreActions.CLOSE_DRAWER })
  }, [dispatch])

  const handleActionClick = React.useCallback(
    destination => {
      navigate(`/${destination}`)
    },
    [navigate]
  )
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={state.drawerOpen}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
    >
      <Box sx={{ width: 250 }} role='presentation'>
        <List>
          {ACTIONS.map(item => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                handleActionClick(item.destination)
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SECONDARY_ACTIONS.map(item => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                handleActionClick(item.destination)
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
})
export default Drawer
