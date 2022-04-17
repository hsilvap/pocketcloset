import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TopBar from '../../components/TopBar/TopBar'
import { UseStoreContext } from '../../context/store'
import { LoadTops } from '../../hooks/useDb'
import { Container, Grid, ImageList, Typography } from '@material-ui/core'

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
          <ImageList rowHeight={160} cols={4}></ImageList>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default Tops
