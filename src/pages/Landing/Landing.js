import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TopBar from '../../components/TopBar/TopBar'
import { LoadUserInfo } from '../../hooks/useDb'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
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

const cards = [
  {
    title: 'Upload your closet',
    text:
      'Upload pictures of your current clothes so you can manage your clothes',
    media: `https://source.unsplash.com/random/?fashion`
  },
  {
    title: 'Organize your closet',
    text: 'Check all of your clothes, organize them by type and color',
    media: `https://source.unsplash.com/random/?fashion,dress`
  },
  {
    title: 'Think you already have something similar?',
    text:
      'Are you about to buy something but feels like you already have it? Upload a picture of what you are about to buy and PocketCloset will see if you have similar clothes!',
    media: `https://source.unsplash.com/random/?fashion,shoe`
  }
]

export default function Landing () {
  const classes = useStyles()
  LoadUserInfo()
  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Pocket Closet
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
            >
              Welcome to the best way to organize your closet, save money, and
              prevent buying similar clothes you already have!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    Get started
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='lg'>
          {/* End hero unit */}
          <Grid container spacing={3}>
            {cards.map(card => (
              <Grid item key={card.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia} image={card.media} />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.title}
                    </Typography>
                    <Typography>{card.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}
