import React from 'react'
import { Container, Divider, Typography } from '@material-ui/core'
import TopBar from '../../components/TopBar/TopBar'
import { useStyles } from './styles'
import { LoadCloset } from '../../hooks/useDb'

const Upload = () => {
  const classes = useStyles()
  LoadCloset()
  return (
    <>
      <TopBar />
      <main className={classes.content}>
        {' '}
        <Container maxWidth='sm'>
          <Typography
            component='h3'
            variant='h4'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Upload Tops
          </Typography>
        </Container>
        <Divider />
        <Container maxWidth='sm'>
          <Typography
            component='h3'
            variant='h4'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Upload Bottoms
          </Typography>
        </Container>
      </main>
    </>
  )
}

export default Upload
