import React from 'react'
import { getStorage, ref, deleteObject } from 'firebase/storage'

import { makeStyles } from '@material-ui/core/styles'
import TopBar from '../../components/TopBar/TopBar'
import { UseStoreContext } from '../../context/store'
import { LoadBottoms } from '../../hooks/useDb'
import {
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from '@material-ui/core'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { AiOutlineDelete } from 'react-icons/ai'
import { StoreActions } from '../../context/reducer'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))

const Bottoms = ({ width }) => {
  LoadBottoms()
  const { state, dispatch } = UseStoreContext()

  const storage = getStorage()
  const classes = useStyles()
  const isMobile = isWidthDown('sm', width)

  const handleImageDelete = async bottom => {
    try {
      const fileDeleteRef = ref(
        storage,
        `${state.user.uid}/bottoms/${bottom.name}`
      )
      await deleteObject(fileDeleteRef)
      dispatch({ type: StoreActions.DELETE_BOTTOM, data: bottom })
    } catch (error) {
      console.error(error)
    } finally {
    }
  }
  return (
    <React.Fragment>
      <TopBar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              My Bottoms
            </Typography>
          </Container>
        </div>
        <Container maxWidth='lg'>
          <ImageList
            sx={{ width: 500, height: 450 }}
            cols={isMobile ? 1 : 3}
            gap={8}
          >
            {state.bottoms.data.map(item => (
              <ImageListItem key={item.url} style={{ height: 'auto' }}>
                <img src={item.url} alt={item.name} />
                <ImageListItemBar
                  title={item.name}
                  className={classes.titleBar}
                  position='top'
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                      onClick={() => {
                        handleImageDelete(item)
                      }}
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </main>
      <Backdrop
        style={{ zIndex: 2 }}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={state.bottoms.loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </React.Fragment>
  )
}

export default withWidth()(Bottoms)
