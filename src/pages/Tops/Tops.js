import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TopBar from '../../components/TopBar/TopBar'
import { UseStoreContext } from '../../context/store'
import { LoadTops } from '../../hooks/useDb'
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

const Tops = () => {
  const { state, dispatch } = UseStoreContext()
  const classes = useStyles()

  LoadTops()
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
              My Tops
            </Typography>
          </Container>
        </div>
        <Container maxWidth='lg'>
          <ImageList cols={3}>
            {state.tops.data.map(item => (
              <ImageListItem key={item.url} style={{ height: 'auto' }}>
                <img src={item.url} alt={item.title} />
                <ImageListItemBar title={item.name} />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </main>
      <Backdrop
        style={{ zIndex: 2 }}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={state.tops.loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </React.Fragment>
  )
}

export default Tops
