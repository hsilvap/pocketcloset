import React from 'react'

import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import {
  Box,
  ClickAwayListener,
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
const ACTIONS = [
  { text: 'My closet', destination: '', icon: <AiOutlineInstagram /> },
  { text: 'My tops', destination: '', icon: <AiOutlineSkin /> },
  { text: 'My bottoms', destination: '', icon: <AiOutlineTag /> }
]
const SECONDARY_ACTIONS = [
  { text: 'Upload clothes', destination: '', icon: <AiOutlineCloudUpload /> },
  {
    text: 'Check if I already have something similar',
    destination: '',
    icon: <AiOutlineWallet />
  }
]
const Drawer = React.memo(() => {
  const { state, dispatch } = UseStoreContext()
  const handleOpenDrawer = React.useCallback(() => {
    dispatch({ type: StoreActions.OPEN_DRAWER })
  }, [dispatch])

  const handleCloseDrawer = React.useCallback(() => {
    dispatch({ type: StoreActions.CLOSE_DRAWER })
  }, [dispatch])

  const handleActionClick = React.useCallback(() => [], {})
  return (
    <ClickAwayListener>
      <SwipeableDrawer
        anchor={'left'}
        open={state.drawerOpen}
        onClose={handleCloseDrawer}
        onOpen={handleOpenDrawer}
      >
        <Box sx={{ width: 250 }} role='presentation'>
          <List>
            {ACTIONS.map(item => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {SECONDARY_ACTIONS.map(item => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </ClickAwayListener>
  )
})
export default Drawer
