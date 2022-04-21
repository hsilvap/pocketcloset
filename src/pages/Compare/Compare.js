import React from 'react'
import ImageUploader from 'react-images-upload'
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage'

import TopBar from '../../components/TopBar/TopBar'
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  Typography
} from '@material-ui/core'
import { useStyles } from './styles'
import { UseStoreContext } from '../../context/store'

const Compare = () => {
  const classes = useStyles()
  const storage = getStorage()

  const { state } = UseStoreContext()
  const [file, setFile] = React.useState([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [requestStatus, setRequestStatus] = React.useState({
    open: false,
    text: ''
  })

  const uploadFile = React.useCallback(
    async tops => {
      setIsUploading(true)
      try {
        for (const file of tops) {
          const storageRef = ref(
            storage,
            `${state.user.uid}/compare/${file.name}`
          )
          await uploadBytes(storageRef, file)
        }
      } catch (error) {
        setRequestStatus({ open: true, text: 'There was an error: ' + error })
      } finally {
        setIsUploading(false)
      }
    },
    [storage, state.user]
  )

  const deleteFile = React.useCallback(
    async file => {
      setIsUploading(true)
      try {
        const fileDeleteRef = ref(
          storage,
          `${state.user.uid}/compare/${file.name}`
        )
        await deleteObject(fileDeleteRef)
      } catch (error) {
        console.error(error)
      } finally {
        setIsUploading(false)
      }
    },
    [state.user, storage]
  )

  const onDropTops = React.useCallback(
    async picture => {
      if (picture.length < file.length) {
        for (let i = 0; i < file.length; i++) {
          const exists = picture.find(x => x.name === file[i].name)
          if (!exists) {
            deleteFile(file[i])
          }
        }
      } else {
        uploadFile(picture)
      }
      setFile([...picture])
    },
    [file, deleteFile, uploadFile]
  )

  return (
    <div className={classes.main}>
      <TopBar />
      <main className={classes.content}>
        <Container maxWidth='sm'>
          <Typography
            component='h3'
            variant='h4'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            See if you already have something similar
          </Typography>

          {file.length >= 1 && (
            <Button
              variant='contained'
              color='primary'
              style={{ display: 'block', margin: '0 auto' }}
            >
              Find out!
            </Button>
          )}
          <ImageUploader
            buttonClassName='MuiButton-containedPrimary MuiButton-containedPrimary'
            withIcon={true}
            singleImage
            buttonText='Choose image'
            onChange={onDropTops}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview
            file
            label='Max file size: 5mb, accepted: jpg, png'
            buttonStyles={{
              color: ' #fff',
              backgroundColor: '#3f51b5',
              boxShadow:
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
              padding: ' 6px 16px',
              fontSize: '0.875rem',
              minWidth: '64px',
              boxSizing: ' border-box',
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              fontWeight: 500,
              lineHeight: 1.75,
              borderRadius: 4,
              letterSpacing: '0.02857em',
              textTransform: 'uppercase'
            }}
          />
        </Container>
        <Divider />
        {file.length > 1 && (
          <Container maxWidth='sm'>
            <Typography
              component='h3'
              variant='h4'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Results
            </Typography>
          </Container>
        )}
      </main>
      <Backdrop
        style={{ zIndex: 2 }}
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={requestStatus.open}
        onClose={() => {
          setRequestStatus({ text: '', open: false })
        }}
        message={requestStatus.text}
      />
    </div>
  )
}

export default Compare
